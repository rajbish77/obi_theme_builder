import React from 'react';
import {
  Theme,
  createStyles,
} from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../slices/editor/editorWindoSlive";
import { AuthState } from "../slices/types";
import PreviewWindow from './PreviewWindow/PreviewWindow';

const useStyles: any = styled((theme: Theme) => createStyles({
  mainWindow: {
    overflowY: "auto",
    height: "100%",
  },
  navAppBar: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  componentsTabRoot: {
    backgroundColor: "#fff", // ensures transparent colors show properly
  },
  tabs: {
    flexGrow: 1,
  },
  tabFlexContainer: {
    justifyContent: "center",
  },
})
);

export const previewTabId = "preview-tab";
export const componentsTabId = "components-tab";
export const savedThemesTabId = "saved-themes-tab";

const MainWindow = () => {
  const classes = useStyles();
  const activeTab = useSelector((state: AuthState) => state.activeTab);
  const dispatch = useDispatch();
  const setTab = React.useCallback((value: string) => dispatch(setActiveTab(value)), [dispatch]);

  return (
    <>
      <div className={classes.mainWindow}>
      {activeTab === "preview" && <PreviewWindow />}
      </div>
    </>
  );
};

export default MainWindow;
