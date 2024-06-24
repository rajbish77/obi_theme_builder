import React from "react";
import Home from "./Samples/Home";
import PreviewWrapper from "./PreviewWrapper";
import Header from "./Samples/Header";
import Footer from "./Samples/Footer";
import Navigationbar from "./Samples/NavigationBar";
import { createTheme, Theme } from "@mui/material/styles";
import styled from "styled-components";

// Create MUI theme
const theme = createTheme({
  palette: {
    body: {
      backgroundColor: "#f0f0f0", // Example color
    },
  },
});

// Define styled component for background
const Background = styled.div`
  background-color: ${(props) => props.theme.palette.body?.backgroundColor};
`;

// Component definition
const PreviewWindow: React.FC = () => {
  return (
    <PreviewWrapper>
      <Background>
        <Header />
        <Navigationbar />
        <Home />
        <Footer />
      </Background>
    </PreviewWrapper>
  );
};

export default PreviewWindow;
