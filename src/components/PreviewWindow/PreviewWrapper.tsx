import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootStateType } from "../../slices/types";
import ThemeWrapper from "./ThemeWrapper";
import { Paper } from "@mui/material";

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
const PreviewBackgroundPaper = styled(Paper)`
  && {
    background-color: theme.palette.background.default};
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
  }
`;

interface PreviewBackgroundProps {
  children: React.ReactNode;
}

const PreviewBackground = ({ children }: PreviewBackgroundProps) => {
  const themeOptions = useSelector((state: RootStateType) => state.themeOptions);
  const directionIsRTL = themeOptions?.direction === "rtl";

  return (
    <PreviewBackgroundPaper elevation={8} square dir={directionIsRTL ? "rtl" : ""}>
      {children}
    </PreviewBackgroundPaper>
  );
};

const PreviewWrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => {  return (
    <PreviewWrapperContainer>
      <ThemeWrapper>
        <LetterBox>
          <PreviewBackground>{children}</PreviewBackground>
        </LetterBox>
      </ThemeWrapper>
    </PreviewWrapperContainer>
  );
};

export default PreviewWrapper;