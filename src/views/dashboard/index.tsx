import React from 'react';
import { Box } from '@mui/material';
import { DashboardState } from '@/models/dashboard';
import CardDetail from './components/CardDetail';
import CardTimes from './components/CardTimes';
import CardFilters from './components/CardFilters';
import TransactionDetail from './components/TransactionDetail';
import ListTransactions from './components/ListTransactions';

interface Props {
    data: DashboardState[];
}

const Dashboard: React.FC<Props> = ({ data }) => {
    return (
        <Box
            sx={{ width: '100%', p: { xs: 2, sm: 5 } }}
            data-testid="dashboardContainer">
            <TransactionDetail />
            <Box
                sx={{ display: { xs: 'block', sm: 'flex' } }}
                alignItems={'flex-start'}
                justifyContent={'space-between'}>
                <CardDetail />
                <Box
                    sx={{
                        width: { xs: '100%', sm: '60%' }
                    }}>
                    <CardTimes />
                    <CardFilters />
                </Box>
            </Box>

            <ListTransactions data={data} />
        </Box>
    );
};

export default Dashboard;
