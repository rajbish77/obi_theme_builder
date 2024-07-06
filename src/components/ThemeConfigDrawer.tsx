import React from 'react';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import { useTheme, styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector, useDispatch } from 'react-redux';
import MonacoThemeCodeEditor from './MonacoThemeCodeEditor';
import ThemeTools from './ThemeTools/ThemeTools';
import { toggleThemeConfig } from '../state/themeSlice';
import { RootState } from '../app/store';

const drawerWidth = 300;

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  height: '100vh',
  maxWidth: '90vw',
});

const StyledDrawerPaper = styled('div')(({ theme }) => ({
  width: drawerWidth,
  overflowY: 'visible',
  maxWidth: '90vw',
}));

const StyledGridContainer = styled(Grid)({
  height: '100vh',
});

const StyledGridItem = styled(Grid)(({ theme }) => ({
  minHeight: '30vh',
  height: '100%',
}));

const ThemeConfigDrawer = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const themeId = useSelector((state: RootState) => state.theme.themeId);
  console.log(themeId)
  const open = useSelector((state: RootState) => state.theme.themeConfigOpen);
  console.log(open)
  const permanent = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <StyledDrawer
      variant={permanent ? 'permanent' : 'temporary'}
      anchor="right"
      open={open}
      onClose={() => dispatch(toggleThemeConfig())}
    >
      <StyledDrawerPaper>
        <StyledGridContainer container direction="column" wrap="nowrap">
          <StyledGridItem item>
            <MonacoThemeCodeEditor key={themeId} /> {/* top button */}
          </StyledGridItem>
          <StyledGridItem item>
            <ThemeTools /> {/* this is text */}
          </StyledGridItem>
        </StyledGridContainer>
      </StyledDrawerPaper>
    </StyledDrawer>
  );
};

export default ThemeConfigDrawer;
