import React from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "../../slices/types";
import { ThemeProvider, Theme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import styled from "styled-components";

// Define the styled components using styled-components
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled(Paper)`
  background-color: ${(props) => props.theme.palette.background.default};
  width: 100%;
  height: 100%;
`;

// Define the interface for props
interface ThemeWrapperProps {
  children: React.ReactNode | React.ReactNodeArray;
}

// ThemeWrapper component
const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const themeObject = useSelector((state: RootStateType) => state.themeObject);

  return (
    <ThemeProvider theme={themeObject}>
      <Wrapper>
        <Container elevation={0} square>
          {children}
        </Container>
      </Wrapper>
    </ThemeProvider>
  );
};

export default ThemeWrapper;
