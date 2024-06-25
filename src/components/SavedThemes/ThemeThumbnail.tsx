import React, { useEffect, useState } from "react";
import { Theme, ThemeOptions, createTheme, styled } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const RootContainer = styled('div')(({ theme, large }: { theme: Theme, large: boolean }) => ({
  height: 100,
  maxWidth: "85vw",
  width: 1600 / 9,
  position: "relative",
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  "&.large": {
    height: 200,
    width: (1600 / 9) * 2,
    fontSize: 28,
    "& $FabIcon": {
      height: 36,
      width: 36,
    },
    "& $Fab": {
      height: 32,
      width: 32,
      bottom: 8,
      right: 8,
    },
  },
}));

const AppBar = styled('div')(({ theme }: { theme: Theme }) => ({
  height: "15%",
  width: "100%",
  paddingLeft: 4,
  fontSize: "75%",
  backgroundColor: theme.palette.primary.main,
}));

const AppBarTitle = styled('span')(({ theme }: { theme: Theme }) => ({
  color: theme.palette.primary.contrastText,
}));

const ContentTitle = styled('span')(({ theme }: { theme: Theme }) => ({
  fontSize: "60%",
  paddingLeft: 4,
}));

const CardContainer = styled('div')(({ theme }: { theme: Theme }) => ({
  height: "50%",
  margin: 4,
  backgroundColor: theme.palette.background.paper,
}));

const CardHeader = styled('div')(({ theme }: { theme: Theme }) => ({
  fontSize: "55%",
}));

const CardSubheader = styled('div')(({ theme }: { theme: Theme }) => ({
  fontSize: "45%",
  color: theme.palette.text.secondary,
}));

const Fab = styled('div')(({ theme }: { theme: Theme }) => ({
  height: 16,
  width: 16,
  borderRadius: "50%",
  position: "absolute",
  bottom: 4,
  right: 4,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const FabIcon = styled(AddIcon)(({ theme }: { theme: Theme }) => ({
  height: 18,
  width: 18,
}));

interface ThemeThumbnailProps {
  themeOptions: ThemeOptions;
  large?: boolean;
}

const ThemeThumbnail: React.FC<ThemeThumbnailProps> = ({ themeOptions, large = false }) => {
  const [themeObject, setThemeObject] = useState<Theme>();

  useEffect(() => {
    setThemeObject(createTheme(themeOptions));
  }, [themeOptions]);

  return (
    <RootContainer theme={themeObject!} large={large} className={large ? "large" : ""}>
      <AppBar theme={themeObject!}>
        <AppBarTitle theme={themeObject!}>Title</AppBarTitle>
      </AppBar>
      <ContentTitle>Content</ContentTitle>
      <CardContainer theme={themeObject!}>
        <CardHeader>Card Header</CardHeader>
        <CardSubheader>Card Subheader</CardSubheader>
      </CardContainer>
      <Fab theme={themeObject!}>
        <FabIcon />
      </Fab>
    </RootContainer>
  );
};

export default ThemeThumbnail;
