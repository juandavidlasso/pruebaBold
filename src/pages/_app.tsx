import { useCallback, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Theme, ThemeProvider } from '@mui/material';
import '@/styles/globals.css';
import { DashboardProvider } from '@/store/context/DashboardContext';
import { darkTheme } from '@/utils/theme/darkTheme';
import { lightTheme } from '@/utils/theme/lightTheme';
import { ThemeProps } from '@/models/theme';

export default function App({ Component, pageProps }: AppProps) {
    const [theme, setTheme] = useState<Theme>(lightTheme);

    const toogleTheme = useCallback((theme: ThemeProps) => {
        if (theme === 'dark') {
            document.documentElement.classList.add(theme);
        } else {
            document.documentElement.classList.remove('dark');
        }
        setTheme(theme === 'light' ? lightTheme : darkTheme);
    }, []);

    useEffect(() => {
        const theme = sessionStorage.getItem('theme') || 'light';
        document.documentElement.classList.add(theme);
        setTheme(theme === 'light' ? lightTheme : darkTheme);
    }, [theme]);
    return (
        <DashboardProvider>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} toogleTheme={toogleTheme} />
            </ThemeProvider>
        </DashboardProvider>
    );
}
