import React, { useContext } from 'react';
import {
    Box,
    InputAdornment,
    Paper,
    TableContainer,
    TextField,
    Typography,
    useTheme
} from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import { useDashboard } from '../hooks/useDashboard';
import { DashboardContext } from '@/store/context/DashboardContext';
import { DashboardState } from '@/models/dashboard';

interface Props {
    data: DashboardState[];
}

const ListTransactions: React.FC<Props> = ({ data }) => {
    const theme = useTheme();
    const { columns, searchTerm, filteredData, handleSearchChange } =
        useDashboard(data);
    const { setOpenDrawer, setTransactionDetail, filterDate } =
        useContext(DashboardContext);

    return (
        <Paper
            sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
            data-testid="listTransactionTable">
            <Box
                sx={{
                    width: '100%',
                    p: 1.5,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    background:
                        'linear-gradient(270deg, #ee424e 13.86%, #121e6c 83.33%)'
                }}>
                <Typography sx={{ color: theme.palette.grey[100] }}>
                    Tus ventas de {filterDate ?? ''}
                </Typography>
            </Box>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Buscar"
                value={searchTerm}
                onChange={handleSearchChange}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }
                }}
                sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        borderTopWidth: 0
                    }
                }}
            />
            <TableContainer>
                <DataGrid
                    rows={filteredData}
                    columns={columns}
                    disableVirtualization
                    rowHeight={80}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 }
                        }
                    }}
                    getRowId={(row) => row.id}
                    pageSizeOptions={[5, 10]}
                    sx={{
                        '& .MuiDataGrid-cell': {
                            color:
                                theme.palette.mode === 'light'
                                    ? 'grey.500'
                                    : theme.palette.grey[100]
                        },
                        '& .MuiDataGrid-row:nth-of-type(odd)': {
                            borderLeft: `3px solid ${theme.palette.primary.main}`
                        }
                    }}
                    disableRowSelectionOnClick
                    onRowClick={(params: GridRowParams) => {
                        setTransactionDetail(params.row);
                        setOpenDrawer(true);
                    }}
                    localeText={{
                        MuiTablePagination: {
                            labelRowsPerPage: 'Filas por página'
                        }
                    }}
                />
            </TableContainer>
        </Paper>
    );
};

export default ListTransactions;
