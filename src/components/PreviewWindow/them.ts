import { createTheme, Theme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        body?: {
            backgroundColor?: string;
        };
    }
    interface PaletteOptions {
        body?: {
            backgroundColor?: string;
        };
    }
}

const theme = createTheme({
    palette: {
        body: {
            backgroundColor: '#f0f0f0', // Example color
        },
    },
});

export default theme;
