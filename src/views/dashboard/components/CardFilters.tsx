import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Popover,
    Typography,
    useTheme
} from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { listCheckbox } from '@/utils/constants/dashboard';
import { useCardFilters } from '../hooks/useCardFilters';

const CardFilters: React.FC = () => {
    const theme = useTheme();
    const {
        id,
        open,
        anchorEl,
        filterCheck,
        allUnchecked,
        isActiveFilter,
        handleClick,
        handleClose,
        handleCheckboxChange
    } = useCardFilters();

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                mt: 2,
                justifyContent: 'flex-end',
                mb: 2
            }}>
            <Button
                onClick={handleClick}
                sx={{
                    background: isActiveFilter
                        ? theme.palette.secondary.main
                        : '#FFFFFF',
                    width: { xs: '100%', sm: '20%' },
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    justifyContent: 'center',
                    borderRadius: 2,
                    color: isActiveFilter
                        ? '#FFFFFF'
                        : theme.palette.primary.main,
                    gap: 1
                }}>
                <Typography sx={{ fontWeight: 600 }}>Filtrar</Typography>
                <TuneOutlinedIcon />
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                sx={{
                    left: '-40px'
                }}>
                <FormGroup
                    sx={{
                        p: 2,
                        color:
                            theme.palette.mode === 'light'
                                ? theme.palette.primary.main
                                : theme.palette.grey[100]
                    }}>
                    {listCheckbox.map((list) => (
                        <FormControlLabel
                            key={list.name}
                            control={
                                <Checkbox
                                    sx={{
                                        '&.Mui-checked': {
                                            color:
                                                theme.palette.mode === 'light'
                                                    ? theme.palette.primary.main
                                                    : theme.palette.grey[100]
                                        }
                                    }}
                                    name={list.name}
                                    checked={filterCheck[list.name]}
                                    onChange={handleCheckboxChange}
                                />
                            }
                            label={list.title}
                        />
                    ))}
                    <Button
                        onClick={handleClose}
                        disabled={allUnchecked}
                        sx={{
                            p: 2,
                            background:
                                theme.palette.mode === 'light'
                                    ? theme.palette.secondary.main
                                    : theme.palette.grey[500],
                            color:
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.primary.main,
                            borderRadius: '100px',
                            '&:disabled': {
                                '&::after': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(243, 243, 243, 0.5)',
                                    zIndex: 1,
                                    borderRadius: '100px'
                                }
                            }
                        }}>
                        Aplicar
                    </Button>
                </FormGroup>
            </Popover>
        </Box>
    );
};

export default CardFilters;
