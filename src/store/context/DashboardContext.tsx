import { createContext, useEffect, useState } from 'react';
import { DashboardState } from '@/models/dashboard';
import { FiltersType } from '@/models/filters';

interface DashboardContext {
    filterDate: FiltersType;
    setFilterDate: React.Dispatch<React.SetStateAction<FiltersType>>;
    filterCheck: {
        TERMINAL: boolean;
        PAYMENT_LINK: boolean;
        ALL: boolean;
    };
    setFilterCheck: React.Dispatch<
        React.SetStateAction<{
            TERMINAL: boolean;
            PAYMENT_LINK: boolean;
            ALL: boolean;
        }>
    >;
    openDrawer: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    transactionDetail: DashboardState | undefined;
    setTransactionDetail: React.Dispatch<
        React.SetStateAction<DashboardState | undefined>
    >;
    totalAmount: number;
    setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
}

export const DashboardContext = createContext<DashboardContext>({
    filterDate: '',
    setFilterDate: () => '',
    filterCheck: { TERMINAL: false, PAYMENT_LINK: false, ALL: false },
    setFilterCheck: () => {},
    openDrawer: false,
    setOpenDrawer: () => false,
    transactionDetail: undefined,
    setTransactionDetail: () => undefined,
    totalAmount: 0,
    setTotalAmount: () => 0
});

export const DashboardProvider = ({ children }: { children: JSX.Element }) => {
    const [filterDate, setFilterDate] = useState<FiltersType>('');
    const [filterCheck, setFilterCheck] = useState({
        TERMINAL: false,
        PAYMENT_LINK: false,
        ALL: false
    });
    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [transactionDetail, setTransactionDetail] =
        useState<DashboardState>();
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        const storedFilterCheck = sessionStorage.getItem('filterCheck');
        if (storedFilterCheck) {
            const parsedFilterCheck = JSON.parse(storedFilterCheck);
            setFilterCheck((prevStates) => ({
                ...prevStates,
                ...parsedFilterCheck
            }));
        }

        const filterValue = sessionStorage.getItem('filterDate');
        if (filterValue) {
            setFilterDate(filterValue as FiltersType);
        }
    }, []);

    return (
        <DashboardContext.Provider
            value={{
                totalAmount,
                transactionDetail,
                openDrawer,
                filterDate,
                filterCheck,
                setTotalAmount,
                setTransactionDetail,
                setOpenDrawer,
                setFilterDate,
                setFilterCheck
            }}>
            {children}
        </DashboardContext.Provider>
    );
};
