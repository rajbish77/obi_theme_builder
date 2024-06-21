import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { makeStyles, Theme } from "@mui/material/styles";
import Layout from "../components/Layout";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";
import LoginForm from "../PreviewWindow/Login";
import { useSelector, useDispatch } from "react-redux";
import PublisherListing from "../PreviewWindow/Publisher";
// import EditorDashboard from "../PreviewWindow/EditorDashboard"; // Assuming you have this component
import { AuthState } from "../slices/types";
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
    [theme.breakpoints.up("md")]: {
      position: "static",
    },
  },
}));

const IndexPage = () => {
  const classes = useStyles();
  const auth = useSelector((state: AuthState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const Publisher = () => (
    <div className={classes.headerNavAndMain}>
      <Header />
      <div className={classes.navAndMain}>
        <main className={`${classes.main}`}>
          <PublisherListing />
        </main>
      </div>
      <div className="footer-class"></div>
    </div>
  );

  const Editor = () => (
    <div className={classes.appRoot}>
      <ErrorBoundary>
        <div className={classes.headerNavAndMain}>
          <Header />
          <div className={classes.navAndMain}>
            <main className={classes.main}>
              {/* <EditorDashboard />  */}
            </main>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );

  return (
    <>
      {auth.auth ? (
        <Layout>
          {getPublisherLoginStatus(auth) && <Publisher />}
          {getEditorLoginStatus(auth) && <Editor />}
        </Layout>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default IndexPage;
