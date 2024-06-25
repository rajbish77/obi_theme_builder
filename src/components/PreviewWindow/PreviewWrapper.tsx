import React from "react";
import ThemeWrapper from "./ThemeWrapper";
import styled from "styled-components";

const PreviewWrapperContainer = styled.div`
  /* your styles here */
`;

const LetterBox = styled.div`
  /* your styles here */
`;

const PreviewBackground = styled.div`
  /* your styles here */
`;

interface PreviewWrapperProps {
  children: React.ReactNode;
}

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

export default PreviewWrapper;
