import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { RootStateType } from "../../slices/types";
import ThemeWrapper from "./ThemeWrapper";
import styled from "styled-components";

// Styled components for PreviewWrapper
const PreviewWrapperContainer = styled.div`
  height: 100%;
  position: relative;
`;

const LetterBox = styled.div`
  background-color: #212121;
  height: 100%;
`;

// Styled component for PreviewBackground
const PreviewArea = styled(Paper)`
  background-color: ${(props) => props.theme.palette.background.default};
  max-width: none;
  height: 100%;
  overflow-y: scroll;
  margin: auto;
  position: relative;
  &.xs {
    max-width: 375px;
  }
  &.sm {
    max-width: 650px;
  }
  &.md {
    max-width: 1000px;
  }
`;

interface PreviewWrapperProps {
  children: ReactNode;
}

/**
 * Wraps children in ThemeWrapper and creates a letterbox around the component
 */
const PreviewWrapper: React.FC<PreviewWrapperProps> = ({ children }) => {
  return (
    <PreviewWrapperContainer>
      {/* <PreviewSizeControls /> */}
      <ThemeWrapper>
        <LetterBox>
          <PreviewBackground>{children}</PreviewBackground>
        </LetterBox>
      </ThemeWrapper>
    </PreviewWrapperContainer>
  );
};

// Component remains the same, no change in logic

/**
 * Creates a Paper component with a backgroundColor of `palette.background.default`
 * adds 'rtl' as a className if required by the theme to enable RTL styles.
 */
const PreviewBackground: React.FC<PreviewWrapperProps> = ({ children }) => {
  const directionIsRTL = useSelector(
    (state: RootStateType) => state.themeOptions.direction === "rtl"
  );

  return (
    <PreviewArea
      elevation={8}
      square
      className={directionIsRTL ? "previewArea rtl" : "previewArea"}
      dir={directionIsRTL ? "rtl" : ""}
    >
      {children}
    </PreviewArea>
  );
};

export default PreviewWrapper;
