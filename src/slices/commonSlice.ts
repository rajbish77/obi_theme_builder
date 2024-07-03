import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Affiliate } from './types';

interface AffiliateItem {
  id: number;
  name: string;
}

interface AffiliateState {
  affiliates: Affiliate;
}

const initialState: AffiliateState = {
  affiliates: {
    id : null,
    name : null,
  },
};

const commonWork = createSlice({
  name: 'affiliate',
  initialState,
  reducers: {
    setAffiliates(state, action) {
        let data = action.payload
      state.affiliates = data;
    },
  },
});

export const { setAffiliates } = commonWork.actions;
export default commonWork.reducer;
