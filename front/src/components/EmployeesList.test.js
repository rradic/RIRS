import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EmployeesList from './EmployeesList';
import { fetchEmployees, updateEmployeeBudget } from '../services/api';

jest.mock('../services/api');

const mockEmployees = [
    { _id: '1', name: 'John Doe', email: 'john@example.com', budget: 1000 },
    { _id: '2', name: 'Jane Smith', email: 'jane@example.com', budget: 2000 },
];

describe('EmployeesList', () => {
    beforeEach(async () => {
        await fetchEmployees.mockResolvedValue(mockEmployees);
    });

    test('Prikazi ustrezno ime priimek in email', async () => {
        render(<EmployeesList />);
        await waitFor(() => {
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('john@example.com')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
            expect(screen.getByText('jane@example.com')).toBeInTheDocument();
        });
    });

    test('Odpri dialog pravilno', async () => {
        render(<EmployeesList />);
        await waitFor(() => screen.getByText('John Doe'));
        fireEvent.click(screen.getByText('John Doe'));
        await waitFor(() => {
            expect(screen.getByText('Employee budget update')).toBeInTheDocument();
            expect(screen.getByText('Name: John Doe')).toBeInTheDocument();
            expect(screen.getByLabelText('Budget')).toHaveValue(1000);
        });
    });

    test('Posodobi budzet ko se shrane posodobitve', async () => {
        await updateEmployeeBudget.mockResolvedValue({});
        render(<EmployeesList />);
        await waitFor(() => screen.getByText('John Doe'));
        fireEvent.click(screen.getByText('John Doe'));
        await waitFor(() => screen.getByLabelText('Budget'));
        fireEvent.change(screen.getByLabelText('Budget'), { target: { value: 1500 } });
        fireEvent.click(screen.getByText('save'));
        await waitFor(() => {
            expect(updateEmployeeBudget).toHaveBeenCalledWith('1', 1500);
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('1500')).toBeInTheDocument();
        });
    });

    test('Zapri dialog na klik gumba', async () => {
        render(<EmployeesList />);
        await waitFor(() => screen.getByText('John Doe'));
        fireEvent.click(screen.getByText('John Doe'));
        await waitFor(() => screen.getByText('Employee budget update'));
        fireEvent.click(screen.getByText('Close'));
        await waitFor(() => {
            expect(screen.queryByText('Employee budget update')).not.toBeInTheDocument();
        });
    });

    test('Prikazi zaposlene ko se nalozi stran', async () => {
        render(<EmployeesList />);
        await waitFor(async () => {
            expect(await fetchEmployees).toHaveBeenCalledTimes(1);
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        });
    });
});