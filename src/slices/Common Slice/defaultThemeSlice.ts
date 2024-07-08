import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeOptions } from '@mui/material/styles';
import { defaultThemeOptions } from '../../siteTheme';

interface DefaultThemeOptionsState {
  themeOptions: ThemeOptions;
}

const initialState: DefaultThemeOptionsState = {
  themeOptions: defaultThemeOptions,
};

const defaultThemeOptionsSlice = createSlice({
  name: 'defaultThemeOptions',
  initialState,
  reducers: {
    setDefaultThemeOptions: (state:any, action: PayloadAction<ThemeOptions>) => {
      state.themeOptions = action.payload;
    },
  },
});

export const { setDefaultThemeOptions } = defaultThemeOptionsSlice.actions;
export default defaultThemeOptionsSlice.reducer;
