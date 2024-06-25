import React from 'react';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../slices/types';
import PreviewWindow from './PreviewWindow/PreviewWindow';
import { setActiveTab } from '../slices/editor/editorWindowSlice';

// Styled component for MainWindow
const MainWindowContainer = styled('div')({
  mainWindow:{
    overflowY: 'auto',
    height: '100%',
  },
  navAppBar: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  componentsTabRoot: {
    backgroundColor: "#000", // ensures transparent colors show properly
  },
  tabs: {
    flexGrow: 1,
  },
  tabFlexContainer: {
    justifyContent: "center",
  },
});

// Constants for tab identification
export const previewTabId = 'preview-tab';
export const componentsTabId = 'components-tab';
export const savedThemesTabId = 'saved-themes-tab';

const MainWindow = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootStateType) => state.activeTab);
  const setTab = React.useCallback((value: string) => dispatch(setActiveTab(value)), [dispatch]);

  return (
    <MainWindowContainer>
      <PreviewWindow/>
      {/* {activeTab === previewTabId && <PreviewWindow />} */}
      {/* {activeTab === componentsTabId && <ComponentsTab />}
      {activeTab === savedThemesTabId && <SavedThemesTab />} */}
    </MainWindowContainer>
  );
};

export default MainWindow;
