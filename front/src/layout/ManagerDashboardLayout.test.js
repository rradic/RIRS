import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import ManagerDashboardLayout from '../layout/ManagerDashboardLayout';

describe('ManagerDashboardLayout Component', () => {
    test('renders Manager Dashboard title', async () => {
        render(<ManagerDashboardLayout/>);
        await waitFor(
            expect(screen.getByText('Manager Dashboard')).toBeInTheDocument());
    });
});