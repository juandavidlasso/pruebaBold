import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    cssVariables: true,
    typography: {
        fontFamily: 'Montserrat, sans-serif'
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#121E6C !important'
        },
        secondary: {
            main: '#EE424E !important'
        },
        grey: {
            500: '#606060 !important',
            100: '#F3F3F3 !important'
        }
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        }
    }
});
