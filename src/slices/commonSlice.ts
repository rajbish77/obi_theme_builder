import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    affiliate: [],
};

const common = createSlice({
    name: "commonSlice",
    initialState,
    reducers: {
        fetchAffiliate: (state:any, action) => {
            state.affiliate = action.payload;
          },
    },
});


export const {fetchAffiliate} = common.actions;
export default common.reducer