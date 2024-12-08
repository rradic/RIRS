import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserRequests from './UserRequests';

const mockUsersRequests = [
    {
        _id: '1',
        user: { name: 'John Doe' },
        date: '2023-10-01T00:00:00Z',
        amount: 100,
        description: 'Office supplies'
    },
    {
        _id: '2',
        user: { name: 'Jane Smith' },
        date: '2023-10-02T00:00:00Z',
        amount: 200,
        description: 'Travel expenses'
    }
];

describe('UserRequests Component', () => {
    test('Rendeririaj brez napak', () => {
        render(<UserRequests usersRequests={mockUsersRequests} />);
    });

    test('Prikazi ustrezno stevilo vrstic', () => {
        render(<UserRequests usersRequests={mockUsersRequests} />);
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(mockUsersRequests.length + 1); // +1 for the header row
    });

    test('Prikazi ime in priimek pravilno', () => {
        render(<UserRequests usersRequests={mockUsersRequests} />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    test('Prikazi zahtevano kolicino', () => {
        render(<UserRequests usersRequests={mockUsersRequests} />);
        expect(screen.getByText('100€')).toBeInTheDocument();
        expect(screen.getByText('200€')).toBeInTheDocument();
    });
});