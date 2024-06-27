import React from 'react';
import MainWindow from './MainWindow';
import ThemeConfigDrawer from './ThemeConfigDrawer';
import Header from './Header';
import ErrorBoundary from './ErrorBoundary';
import { Theme } from '@mui/material';
import { styled } from '@mui/system';


const useStyles: any = styled('div')({
    appRoot: {
        display: "flex",
        height: "100vh",
    },
    headerNavAndMain: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
    },
    navAndMain: {
        flex: 1,
        display: "flex",
        minHeight: 0,
    },
    main: {
        minWidth: 0,
        minHeight: 0,
        flex: 1,
        display: "flex",
        flexDirection: "column",
    },
    header: {
        // backgroundColor: "#000000",
        breakpoints: {
            position: "static",
        },
    },
});

export default function MainWindoPropes() {
    const classes = useStyles;

    return (
        <div className={classes.appRoot}>
            <ErrorBoundary>
                <div className={classes.headerNavAndMain}>
                    <div className={classes.header}>
                        <Header />
                    </div>
                    <div className={classes.navAndMain}>
                        <main className={classes.main}>
                            <MainWindow />
                        </main>
                    </div>
                </div>
                <ThemeConfigDrawer />
            </ErrorBoundary>
        </div>
    )
}
