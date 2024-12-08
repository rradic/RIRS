import React from 'react';
import { render, screen } from '@testing-library/react';
import ManagerDashboardLayout from '../layout/ManagerDashboardLayout';

describe('ManagerDashboardLayout Component', () => {
    test('renders Manager Dashboard title', () => {
        render(<ManagerDashboardLayout />);
        expect(screen.getByText('Manager Dashboard')).toBeInTheDocument();
    });
});