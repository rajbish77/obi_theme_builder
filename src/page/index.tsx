import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { Theme } from "@mui/material/styles";
import styled from "@mui/material/styles/styled";
import Layout from "../components/Layout";
import ThemeConfigDrawer from "../components/ThemeConfigDrawer";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";
import LoginForm from "../components/PreviewWindow/Samples/Login";
import { AuthState } from "../slices/types";
import { useSelector, useDispatch } from "react-redux";
import PublisherListing from "../components/PreviewWindow/Publisher/index";
import { getEditorLoginStatus, getPublisherLoginStatus } from "../commonFunction";

// Styled components
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

const IndexPage = () => {
  const auth = useSelector((state: AuthState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const Publisher = () => (
    <HeaderNavAndMain>
      <Header />
      <NavAndMain>
        <Main>
          <PublisherListing />
        </Main>
      </NavAndMain>
      <div className="footer-class"></div>
    </HeaderNavAndMain>
  );

  const Editor = () => (
    <AppRoot>
      <ErrorBoundary>
        <HeaderNavAndMain>
          <Header />
          <NavAndMain>
            <Main>
              {/* <EditorDashboard />  */}
            </Main>
          </NavAndMain>
        </HeaderNavAndMain>
      </ErrorBoundary>
    </AppRoot>
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
