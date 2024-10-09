import { GridColDef } from '@mui/x-data-grid';
import { render, screen } from '@testing-library/react';
import { DashboardState } from '@/models/dashboard';
import ListTransactions from '@/views/dashboard/components/ListTransactions';

jest.mock('@mui/x-data-grid', () => ({
    DataGrid: ({
        rows,
        columns
    }: {
        rows: DashboardState[];
        columns: GridColDef[];
    }) => (
        <table>
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.field}>{col.headerName}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.id}>
                        {columns.map((col) => (
                            <td key={col.field}>{row.id}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}));

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

describe('Test Transactions', () => {
    it('Render List Transactions', () => {
        render(<ListTransactions data={mockData} />);

        expect(screen.getByTestId('listTransactionTable')).toBeInTheDocument();
    });

    it('Render data', () => {
        render(<ListTransactions data={mockData} />);

        expect(screen.getByRole('table')).toBeInTheDocument();

        expect(screen.getByText('Transacción')).toBeInTheDocument();
        expect(screen.getByText('Fecha y hora')).toBeInTheDocument();
        expect(screen.getByText('Método de pago')).toBeInTheDocument();
        expect(screen.getByText('ID transacción Bold')).toBeInTheDocument();
        expect(screen.getByText('Monto')).toBeInTheDocument();
    });
});
