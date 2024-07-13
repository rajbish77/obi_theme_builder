import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    affiliate: [],
};

const affiliate = createSlice({
    name: "Fetch Affiliate Slice",
    initialState,
    reducers: {
        fetchAffiliate: (state:any, action) => {
            state.affiliate = action.payload;
          },
    },
});


export const {fetchAffiliate} = affiliate.actions;
export default affiliate.reducer