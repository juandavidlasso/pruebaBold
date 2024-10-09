import React, { useContext } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { DashboardContext } from '@/store/context/DashboardContext';
import { buttons } from '@/utils/constants/filters';

const CardTimes: React.FC = () => {
    const theme = useTheme();
    const { filterDate, setFilterDate } = useContext(DashboardContext);
    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#FFFFFF',
                p: 1,
                borderRadius: 2
            }}>
            {buttons.map((btn) => (
                <Button
                    key={btn}
                    onClick={() => {
                        sessionStorage.setItem('filterDate', btn);
                        setFilterDate(btn);
                    }}
                    sx={{
                        flex: 1,
                        color: theme.palette.primary.main,
                        '&:hover': {
                            background: theme.palette.grey[100],
                            borderRadius: 5
                        },
                        background:
                            filterDate === btn
                                ? theme.palette.grey[100]
                                : '#FFFFFF',
                        borderRadius: 5
                    }}>
                    {btn}
                </Button>
            ))}
        </Box>
    );
};

export default CardTimes;
