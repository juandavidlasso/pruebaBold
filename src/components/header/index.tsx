import React from 'react';
import Image from 'next/image';
import {
    AppBar,
    Box,
    Button,
    ClickAwayListener,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ImgLogo from '@/assets/images/bold-logo.png';
import { ThemeProps } from '@/models/theme';

interface Props {
    toogleTheme: (theme: ThemeProps) => void;
}

const Header: React.FC<Props> = ({ toogleTheme }) => {
    const theme = useTheme();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const [open, setOpen] = React.useState(false);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(true);
    };

    return (
        <AppBar
            data-testid="header"
            position="static"
            sx={{
                background:
                    'linear-gradient(270deg, #ee424e 13.86%, #121e6c 83.33%)',
                height: '90px'
            }}>
            <Container
                sx={{
                    height: '90px',
                    minWidth: '100%',
                    pl: { xs: 0, sm: '40px !important' },
                    pr: { xs: 0, sm: '50px !important' }
                }}>
                <Toolbar disableGutters sx={{ height: '90px' }}>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            mr: 1
                        }}>
                        <Image
                            src={ImgLogo}
                            width={200}
                            height={200}
                            alt="logo"
                            priority
                            style={{ width: '150px', height: '150px' }}
                        />
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' }
                        }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Button>Mi negocio</Button>
                            </MenuItem>
                            <MenuItem>
                                <Button onClick={handleCloseNavMenu}>
                                    Ayuda
                                    <HelpOutlineOutlinedIcon
                                        fontSize="small"
                                        sx={{
                                            ml: 1
                                        }}
                                    />
                                </Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                        <Image
                            src={ImgLogo}
                            width={100}
                            height={100}
                            alt="logo"
                            priority
                        />
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', sm: 'flex' },
                            justifyContent: 'flex-end'
                        }}>
                        <Button sx={{ color: theme.palette.grey[100] }}>
                            Mi negocio
                        </Button>
                        <ClickAwayListener onClickAway={handleTooltipClose}>
                            <Tooltip
                                PopperProps={{
                                    disablePortal: true
                                }}
                                onClose={handleTooltipClose}
                                open={open}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                title="Tooltip de ayuda Bold">
                                <Button
                                    onClick={handleTooltipOpen}
                                    sx={{ color: theme.palette.grey[100] }}>
                                    Ayuda
                                    <HelpOutlineOutlinedIcon
                                        fontSize="small"
                                        sx={{
                                            color: theme.palette.grey[100],
                                            ml: 1
                                        }}
                                    />
                                </Button>
                            </Tooltip>
                        </ClickAwayListener>
                        <IconButton
                            sx={{ minWidth: 5 }}
                            onClick={() => {
                                sessionStorage.setItem('theme', 'light');
                                toogleTheme('light');
                            }}>
                            <LightModeIcon
                                sx={{ color: theme.palette.grey[100] }}
                            />
                        </IconButton>
                        <IconButton
                            sx={{ minWidth: 5 }}
                            onClick={() => {
                                sessionStorage.setItem('theme', 'dark');
                                toogleTheme('dark');
                            }}>
                            <DarkModeIcon
                                sx={{ color: theme.palette.grey[100] }}
                            />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
