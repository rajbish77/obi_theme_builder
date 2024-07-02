import React from 'react'
import { styled } from '@mui/system';
import Header from './Header';
import PublisherListing from './PreviewWindow/Publisher';


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

export default function PublicerPropes() {
    return (
        <>
            <AppRoot>
                {/* <Header /> */}
                <NavAndMain>
                    <Main>
                        <PublisherListing />
                    </Main>
                </NavAndMain>
                <div className="footer-class"></div>
            </AppRoot>
        </>
    )
}
