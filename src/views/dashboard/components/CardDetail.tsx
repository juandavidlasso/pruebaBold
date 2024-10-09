import React, { useContext } from 'react';
import {
    Box,
    Card,
    CardContent,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { DashboardContext } from '@/store/context/DashboardContext';
import { getFormattedDate } from '@/utils/transformedData';

const CardDetail: React.FC = () => {
    const theme = useTheme();
    const { filterDate, totalAmount } = useContext(DashboardContext);

    return (
        <Card sx={{ width: { xs: '100%', sm: '30%' }, mb: 3, borderRadius: 5 }}>
            <CardContent
                sx={{ p: 0, textAlign: 'center', pb: '1px !important' }}>
                <Box
                    sx={{
                        background:
                            'linear-gradient(270deg, #ee424e 13.86%, #121e6c 83.33%)',
                        p: 1.5,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    <Typography
                        gutterBottom
                        sx={{
                            color: theme.palette.grey[100],
                            textAlign: 'left'
                        }}>
                        Total de ventas de {filterDate ?? ''}
                    </Typography>
                    <Tooltip title="Total de ventas">
                        <ErrorOutlineOutlinedIcon
                            sx={{ color: theme.palette.grey[100] }}
                        />
                    </Tooltip>
                </Box>
                <Typography
                    sx={{
                        background:
                            'linear-gradient(270deg, #ee424e 13.86%, #121e6c 83.33%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color:
                            theme.palette.mode === 'light'
                                ? 'transparent'
                                : theme.palette.grey[100],
                        display: 'inline-block',
                        p: 1,
                        mt: 1,
                        fontWeight: 800
                    }}>
                    $ {totalAmount.toLocaleString('es-CO')}
                </Typography>
                <Typography
                    sx={{
                        color:
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[500]
                                : theme.palette.grey[100],
                        p: 1,
                        mb: 0
                    }}>
                    {getFormattedDate(filterDate)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CardDetail;
