import React from 'react';
import MainWindow from '../components/MainWindow';
import ThemeConfigDrawer from '../components/ThemeConfigDrawer';
import ErrorBoundary from '../components/ErrorBoundary';
import { Theme } from '@mui/material';
import { styled } from '@mui/system';
import Header from "../components/Header"

const AppRoot = styled("div")({
    display: "flex",
    height: "100vh",
});

const HeaderNavAndMain = styled("div")({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
});

const NavAndMain = styled("div")({
    flex: 1,
    display: "flex",
    minHeight: 0,
});

const Main = styled("main")({
    minWidth: 0,
    minHeight: 0,
    flex: 1,
    display: "flex",
    flexDirection: "column",
});

export default function Editor() {
    // const classes = useStyles;

    return (
        <AppRoot>
            <ErrorBoundary>
                <HeaderNavAndMain>
                    <Header />
                    <NavAndMain>
                        <Main>
                            <MainWindow /> {/* body */}
                        </Main>
                    </NavAndMain>
                </HeaderNavAndMain>
                <ThemeConfigDrawer />
            </ErrorBoundary>
        </AppRoot>
    )
}
