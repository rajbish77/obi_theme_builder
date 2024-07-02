import React from 'react';
import MainWindow from './MainWindow';
import ThemeConfigDrawer from './ThemeConfigDrawer';
import Header from './Header';
import ErrorBoundary from './ErrorBoundary';
import { Theme } from '@mui/material';
import { styled } from '@mui/system';


// const useStyles: any = styled('div')({
//     appRoot: {
//         display: "flex",
//         height: "100vh",
//     },
//     headerNavAndMain: {
//         flex: 1,
//         display: "flex",
//         flexDirection: "column",
//         minWidth: 0,
//     },
//     navAndMain: {
//         flex: 1,
//         display: "flex",
//         minHeight: 0,
//     },
//     main: {
//         minWidth: 0,
//         minHeight: 0,
//         flex: 1,
//         display: "flex",
//         flexDirection: "column",
//     },
//     header: {
//         // backgroundColor: "#000000",
//         breakpoints: {
//             position: "static",
//         },
//     },
// });

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

export default function MainWindoPropes() {
    // const classes = useStyles;

    return (
        <AppRoot>
            <ErrorBoundary>
                <HeaderNavAndMain>
                    {/* <Header /> */}
                    <NavAndMain>
                        <Main>
                            <MainWindow /> {/* body */}
                        </Main>
                    </NavAndMain>
                </HeaderNavAndMain>
                <ThemeConfigDrawer /> {/* Nave Bar */}
            </ErrorBoundary>
        </AppRoot>
    )
}
