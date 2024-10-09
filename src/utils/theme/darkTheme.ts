import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#121E6C !important'
        },
        secondary: {
            main: '#EE424E !important'
        },
        grey: {
            500: '#F3F3F3 !important',
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
