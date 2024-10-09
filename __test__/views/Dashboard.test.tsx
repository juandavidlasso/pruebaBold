import { render, screen } from '@testing-library/react';
import Dashboard from '@/views/dashboard';
import { DashboardState } from '@/models/dashboard';

const mockData: DashboardState[] = [
    {
        id: '1',
        status: 'SUCCESSFUL',
        paymentMethod: 'BANCOLOMBIA',
        salesType: 'TERMINAL',
        createdAt: 123,
        transactionReference: 456,
        amount: 78923023,
        deduction: 1230
    },
    {
        id: '2',
        status: 'REJECTED',
        paymentMethod: 'DAVIPLATA',
        salesType: 'PAYMENT_LINK',
        createdAt: 38745,
        transactionReference: 9413,
        amount: 1239794,
        deduction: 19347
    }
];

describe('Test Dashboard', () => {
    it('Render Dashboard', () => {
        render(<Dashboard data={mockData} />);

        expect(screen.getByTestId('dashboardContainer')).toBeInTheDocument();
    });
});
