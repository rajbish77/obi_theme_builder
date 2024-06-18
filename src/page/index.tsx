import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react"
import { makeStyles, Theme } from "@mui/material/styles"
import Layout from "../components/Layout"
// import MainWindow from "src/components/MainWindow"
import ThemeConfigDrawer from "../components/ThemeConfigDrawer"
import ErrorBoundary from "../components/ErrorBoundary"
import Header from "../components/Header";
import LoginForm from "../PreviewWindow/Login";
import { AuthState } from "../slices/types";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import PublisherListing from "../PreviewWindow/Publisher/index";
import { getEditorLoginStatus, getPublisherLoginStatus } from "../commonFunction";

const useStyles: any = makeStyles((theme: Theme) => ({
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
    [theme.breakpoints.up("md")]: {
      position: "static",
    },
  },
}))

const IndexPage = () => {
  const classes = useStyles()
  const auth = useSelector((state: AuthState) => state.auth);
  const dispatch = useDispatch();

  console.log(auth)

   useEffect(() => {
    }, [dispatch])

  const Publisher = () => {
    return (
      <>
        <div className={classes.headerNavAndMain}>
          <Header  />
          <div className={classes.navAndMain}>
            <main className={`${classes.main}`}>
              <PublisherListing />
            </main>
          </div>
          <div className="footer-class"></div>
        </div>
      </>
    );
  }

  const Editor = () => {
    return (
      <div className={classes.appRoot}>
      <ErrorBoundary>
        <div className={classes.headerNavAndMain}>
          <Header />
          <div className={classes.navAndMain}>
            <main className={classes.main}>
              {/* <MainWindow /> */}
            </main>
          </div>
        </div>
        <ThemeConfigDrawer />
      </ErrorBoundary>
    </div>
    );
  }

  return (
    <>
      {(auth.auth === true) ?
        (<Layout>
          {getPublisherLoginStatus(auth) && Publisher()}
          {getEditorLoginStatus(auth) && Editor()}
        </Layout>)
        : <LoginForm />
      }
    </>
  )
}

export default IndexPage
