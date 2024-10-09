export interface DashboardState {
    id: string;
    status: StatusType;
    paymentMethod: PaymentMethodType;
    salesType: SalesType;
    createdAt: number;
    transactionReference: number;
    amount: number;
    deduction?: number;
}

export type PaymentMethodType =
    | 'BANCOLOMBIA'
    | 'NEQUI'
    | 'PSE'
    | 'CARD'
    | 'DAVIPLATA';

export type SalesType = 'TERMINAL' | 'PAYMENT_LINK';

export type StatusType = 'SUCCESSFUL' | 'REJECTED';
