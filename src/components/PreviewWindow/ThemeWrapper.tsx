import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import Paper from "@mui/material/Paper";
import styled, { DefaultTheme } from "styled-components";
import { RootState } from "../../app/store";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled(Paper)`
  background-color: ${(props) => props.theme.palette.background.default};
  width: 100%;
  height: 100%;
`;

interface ThemeWrapperProps {
  children: React.ReactNode | React.ReactNodeArray;
}

const castThemeToStyled = (theme: Theme): DefaultTheme => theme as DefaultTheme;

const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const themeObject = useSelector((state: RootState) => state.theme.themeObject);

  // console.log("Theme object from Redux:", themeObject);

  const defaultTheme = createTheme({
    palette: {
      header:{
        button: {}
      },
      background: {
        default: '#ffffff',
      },
    },
  });

  const materialTheme = themeObject || defaultTheme;

  return (
    <MuiThemeProvider theme={materialTheme}>
      <StyledThemeProvider theme={castThemeToStyled(materialTheme)}>
        <Wrapper>
          <Container elevation={0} square>
            {children}
          </Container>
        </Wrapper>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

export default ThemeWrapper;