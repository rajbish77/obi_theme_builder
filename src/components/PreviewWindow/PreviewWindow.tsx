import React from "react";
import styled from "styled-components";
import Home from "./Samples/Home";
import PreviewWrapper from "./PreviewWrapper";
import Header from "./Samples/Header";
import Footer from "./Samples/Footer";
import Navigationbar from "./Samples/NavigationBar";

export const previewNavTabsId = "preview-nav-tabs";

const BackgroundDiv = styled.div`
  background-color: ${(props) => props.theme.palette.body?.backgroundColor};
`;

const PreviewWindow = () => {
  return (
    <PreviewWrapper>
      <BackgroundDiv>
        <Header />
        <Navigationbar />
        <Home />
        <Footer />
      </BackgroundDiv>
    </PreviewWrapper>
  );
};

export default PreviewWindow;
