import React, { useContext } from 'react';
import Image from 'next/image';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    Typography,
    useTheme
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import OnDeviceTrainingIcon from '@mui/icons-material/OnDeviceTraining';
import CloseIcon from '@mui/icons-material/Close';
import { DashboardContext } from '@/store/context/DashboardContext';
import {
    formatTimestamp,
    getIconCard,
    getTitleTransaction
} from '@/utils/transformedData';

const TransactionDetail: React.FC = () => {
    const theme = useTheme();
    const { openDrawer, setOpenDrawer, transactionDetail } =
        useContext(DashboardContext);

    return (
        <div>
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                anchor="right"
                sx={{
                    '& .MuiDrawer-paper': {
                        width: { xs: '85%', sm: '30%' },
                        borderTopLeftRadius: 10,
                        borderBottomLeftRadius: 10
                    }
                }}>
                <Box
                    role="presentation"
                    onClick={() => setOpenDrawer(false)}
                    sx={{ p: { xs: 1, sm: 3 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={() => setOpenDrawer(false)}>
                            <CloseIcon
                                sx={{
                                    color:
                                        theme.palette.mode === 'light'
                                            ? theme.palette.primary.main
                                            : theme.palette.grey[100]
                                }}
                                fontSize="large"
                            />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CheckCircleIcon color="success" fontSize="large" />
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography
                            sx={{
                                color: theme.palette.grey[500],
                                fontWeight: 700,
                                m: 1
                            }}>
                            {`¡${
                                getTitleTransaction(transactionDetail?.status!)
                                    .title
                            }!`}
                        </Typography>
                        <Typography
                            sx={{
                                color:
                                    theme.palette.mode === 'light'
                                        ? theme.palette.primary.main
                                        : theme.palette.grey[100],
                                fontWeight: 700,
                                fontSize: '20px'
                            }}>
                            ${' '}
                            {transactionDetail?.amount.toLocaleString('es-CO')}
                        </Typography>
                        <Typography
                            sx={{
                                color: theme.palette.grey[500],
                                fontWeight: 600,
                                m: 1
                            }}>
                            {formatTimestamp(transactionDetail?.createdAt!)}
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 5 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                            <Typography
                                sx={{
                                    color: theme.palette.grey[500],
                                    fontWeight: 400,
                                    m: 1,
                                    fontSize: '15px'
                                }}>
                                ID transacción Bold
                            </Typography>
                            <Typography
                                sx={{
                                    color: theme.palette.grey[500],
                                    fontWeight: 700,
                                    m: 1,
                                    fontSize: '15px',
                                    display: 'flex',
                                    alignItems: 'flex-end'
                                }}>
                                {transactionDetail?.id}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                            {transactionDetail?.deduction && (
                                <>
                                    <Typography
                                        sx={{
                                            color: theme.palette.grey[500],
                                            fontWeight: 400,
                                            m: 1,
                                            fontSize: '15px'
                                        }}>
                                        Deducción Bold
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: theme.palette.secondary.main,
                                            fontWeight: 700,
                                            m: 1,
                                            fontSize: '15px',
                                            display: 'flex',
                                            alignItems: 'flex-end'
                                        }}>
                                        {transactionDetail?.deduction
                                            ? `-$ ${transactionDetail.deduction.toLocaleString(
                                                  'es-CO'
                                              )}`
                                            : ''}
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </Box>
                    <Divider
                        sx={{
                            background: theme.palette.grey[500],
                            height: '3px'
                        }}
                    />
                    <Box sx={{ mt: 2 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                            <Typography
                                sx={{
                                    color: theme.palette.grey[500],
                                    fontWeight: 400,
                                    m: 1,
                                    fontSize: '15px'
                                }}>
                                Método de pago
                            </Typography>
                            <Typography
                                sx={{
                                    color: theme.palette.grey[500],
                                    fontWeight: 400,
                                    m: 1,
                                    fontSize: '15px'
                                }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                    <Image
                                        src={getIconCard(
                                            transactionDetail?.paymentMethod!
                                        )}
                                        width={30}
                                        height={30}
                                        alt="card"
                                        style={{
                                            marginRight: 5
                                        }}
                                    />
                                    {`****${transactionDetail?.transactionReference}`}
                                </Box>
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                            <Typography
                                sx={{
                                    color: theme.palette.grey[500],
                                    fontWeight: 400,
                                    m: 1,
                                    fontSize: '15px'
                                }}>
                                Tipo de pago
                            </Typography>
                            {transactionDetail?.salesType === 'PAYMENT_LINK' ? (
                                <Typography
                                    sx={{
                                        color: theme.palette.grey[500],
                                        fontWeight: 800,
                                        m: 1,
                                        fontSize: '13px'
                                    }}>
                                    <AllInclusiveIcon
                                        sx={{
                                            transform: 'rotate(1010deg)',
                                            mr: 1
                                        }}
                                        fontSize="small"
                                    />
                                    Link de pagos
                                </Typography>
                            ) : (
                                <Typography
                                    sx={{
                                        color: theme.palette.grey[500],
                                        fontWeight: 800,
                                        m: 1,
                                        fontSize: '13px'
                                    }}>
                                    <OnDeviceTrainingIcon
                                        sx={{
                                            mr: 1
                                        }}
                                        fontSize="small"
                                    />
                                    Pago con datáfono
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </div>
    );
};

export default TransactionDetail;
