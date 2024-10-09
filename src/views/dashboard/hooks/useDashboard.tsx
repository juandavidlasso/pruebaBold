import { useContext, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DashboardState } from '@/models/dashboard';
import { DashboardContext } from '@/store/context/DashboardContext';
import { FiltersType } from '@/models/filters';
import {
    formatNumber,
    formatTimestamp,
    getIconCard,
    getTitleTransaction,
    transformStatus
} from '@/utils/transformedData';

export const useDashboard = (data: DashboardState[]) => {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:1024px)');
    const { filterDate, filterCheck, setTotalAmount } =
        useContext(DashboardContext);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const now = new Date();
    const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    ).getTime();
    const todayEnd = todayStart + 86400000;

    const startOfWeek = new Date(
        now.setDate(now.getDate() - now.getDay())
    ).setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek).setDate(
        new Date(startOfWeek).getDate() + 7
    );

    const startOfSeptember = new Date(now.getFullYear(), 8, 1).getTime();
    const endOfSeptember = new Date(now.getFullYear(), 9, 1).getTime();

    const filterData = (
        data: DashboardState[],
        searchTerm: string,
        dateFilter: FiltersType
    ) => {
        if (filterCheck.ALL) return data;

        if (
            !searchTerm &&
            !dateFilter &&
            !filterCheck.PAYMENT_LINK &&
            !filterCheck.TERMINAL
        )
            return data;

        return data.filter((item) => {
            const transformedStatus = transformStatus(item.status);
            const formattedDate = new Date(item.createdAt).toLocaleString(
                'es-CO'
            );
            const amountFormatted = String(item.amount);

            const matchesSearch =
                transformedStatus
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                formattedDate
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                String(item.transactionReference).includes(searchTerm) ||
                item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                amountFormatted.includes(searchTerm);

            let matchesDateFilter = true;
            if (dateFilter) {
                switch (dateFilter) {
                    case 'Hoy':
                        matchesDateFilter =
                            item.createdAt >= todayStart &&
                            item.createdAt < todayEnd;
                        break;
                    case 'Esta semana':
                        matchesDateFilter =
                            item.createdAt >= startOfWeek &&
                            item.createdAt < endOfWeek;
                        break;
                    case 'Septiembre':
                        matchesDateFilter =
                            item.createdAt >= startOfSeptember &&
                            item.createdAt < endOfSeptember;
                        break;
                    default:
                        matchesDateFilter = true;
                }
            }

            const matchesFilters =
                (!filterCheck.TERMINAL && !filterCheck.PAYMENT_LINK) ||
                (filterCheck.TERMINAL && item.salesType === 'TERMINAL') ||
                (filterCheck.PAYMENT_LINK && item.salesType === 'PAYMENT_LINK');

            return matchesSearch && matchesDateFilter && matchesFilters;
        });
    };

    const filteredData = useMemo(
        () => filterData(data, searchTerm, filterDate),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [data, searchTerm, filterDate, filterCheck]
    );

    const getTotalAmount = () => {
        let totalAmount: number = 0;
        if (filterDate) {
            if (filterDate === 'Hoy') {
                totalAmount = data.reduce((total, item) => {
                    if (
                        item.createdAt >= todayStart &&
                        item.createdAt < todayEnd
                    ) {
                        return total + item.amount;
                    }
                    return total;
                }, 0);
            }
            if (filterDate === 'Esta semana') {
                totalAmount = data.reduce((total, item) => {
                    if (
                        item.createdAt >= startOfWeek &&
                        item.createdAt < endOfWeek
                    ) {
                        return total + item.amount;
                    }
                    return total;
                }, 0);
            }
            if (filterDate === 'Septiembre') {
                totalAmount = data.reduce((total, item) => {
                    if (
                        item.createdAt >= startOfSeptember &&
                        item.createdAt < endOfSeptember
                    ) {
                        return total + item.amount;
                    }
                    return total;
                }, 0);
            }
        }
        return totalAmount;
    };

    useEffect(() => {
        setTotalAmount(getTotalAmount());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterDate]);

    const handleSearchChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setSearchTerm(event.target.value);
    };

    const columns: GridColDef[] = [
        {
            field: 'status',
            headerName: 'Transacción',
            flex: isMobile ? 0 : 1,
            width: isMobile ? 200 : 0,
            renderCell: (param: GridRenderCellParams<DashboardState>) => (
                <Box
                    sx={{
                        color:
                            theme.palette.mode === 'light'
                                ? theme.palette.primary.main
                                : theme.palette.grey[100]
                    }}>
                    {getTitleTransaction(param.value).icon}
                    {getTitleTransaction(param.value).title}
                </Box>
            )
        },
        {
            field: 'createdAt',
            headerName: 'Fecha y hora',
            flex: isMobile ? 0 : 1,
            width: isMobile ? 200 : 0,
            renderCell: (param: GridRenderCellParams<DashboardState>) => (
                <Box>{formatTimestamp(param.value)}</Box>
            )
        },
        {
            field: 'transactionReference',
            headerName: 'Método de pago',
            flex: isMobile ? 0 : 1,
            width: isMobile ? 200 : 0,
            renderCell: (param: GridRenderCellParams<DashboardState>) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                        src={getIconCard(param.row.paymentMethod)}
                        width={30}
                        height={30}
                        alt="card"
                        style={{
                            marginRight: 5
                        }}
                    />
                    {`****${param.value}`}
                </Box>
            )
        },
        {
            field: 'id',
            headerName: 'ID transacción Bold',
            flex: isMobile ? 0 : 1,
            width: isMobile ? 200 : 0
        },
        {
            field: 'amount',
            headerName: 'Monto',
            flex: isMobile ? 0 : 1,
            width: isMobile ? 200 : 0,
            renderCell: (param: GridRenderCellParams<DashboardState>) => (
                <Box
                    sx={{
                        color: theme.palette.primary.main,
                        pt: 1
                    }}>
                    <Typography
                        sx={{
                            color:
                                theme.palette.mode === 'light'
                                    ? theme.palette.primary.main
                                    : theme.palette.grey[100]
                        }}>
                        $ {formatNumber(param.value)}
                    </Typography>
                    {param.row.deduction && (
                        <>
                            <Typography
                                sx={{
                                    color: theme.palette.grey[500],
                                    fontSize: '12px'
                                }}>
                                Deducción Bold
                            </Typography>
                            <Typography
                                sx={{
                                    color: theme.palette.secondary.main,
                                    fontSize: '10px'
                                }}>
                                {`-$ ${param.row.deduction.toLocaleString(
                                    'es-CO'
                                )}`}
                            </Typography>
                        </>
                    )}
                </Box>
            )
        }
    ];

    return {
        columns,
        searchTerm,
        filteredData,
        handleSearchChange,
        filterData
    };
};
