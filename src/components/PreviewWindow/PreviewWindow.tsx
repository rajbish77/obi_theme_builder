import React, { ReactNode } from "react";
import Home from "./Samples/Home";
import PreviewWrapper from "./index";
import Header from "./Samples/Header";
import Footer from "./Samples/Footer";
import Navigationbar from "./Samples/NavigationBar";
import { createTheme, makeStyles, Theme } from '@mui/material/styles';

// Define the extended Palette interface
declare module '@mui/material/styles' {
    interface Palette {
        body?: {
            backgroundColor?: string;
        };
    }
}

// Create MUI theme
const theme = createTheme({
    palette: {
        body: {
            backgroundColor: '#f0f0f0', // Example color
        },
    },
});

// Define component styles
const useStyles: any = makeStyles((theme: Theme) => ({
    background: {
        backgroundColor: theme.palette.body?.backgroundColor,
    }
}));

interface PreviewWindowProps {
    children: ReactNode;
}

const PreviewWindow: React.FC<PreviewWindowProps> = ({ children }) => {
    const classes = useStyles();

    return (
        <PreviewWrapper>
            <div className={classes.background}>
                <Header />
                <Navigationbar />
                <Home />
                <Footer />
            </div>
        </PreviewWrapper>
    );
};

export default PreviewWindow;
