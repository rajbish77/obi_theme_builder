import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logIn: "",
  logOut: "",
  email: "",
  password: "",
  auth: false,
  editor: "N",
  publisher: "N",
  userName: ""
};

const loginWork = createSlice({
  name: "loginWork",
  initialState,
  reducers: {
    setLogIn: (state, action) => {
      const { email, password, themeOption, userName } = action.payload;
      state.email = email;
      state.password = password;
      state.userName = userName;
      state.auth = true;

      if (themeOption === "THEMEEDITOR") {
        state.editor = "Y";
        state.publisher = "N";
      } else if (themeOption === "THEMEPUBLISHER") {
        state.editor = "N";
        state.publisher = "Y";
      }
    },
    setLogOut: (state, action) => {
      state.logIn = "";
      state.logOut = "";
      state.email = "";
      state.password = "";
      state.auth = false;
      state.editor = "N";
      state.publisher = "N";
      state.userName = "";
    },
  },
});

export const { setLogIn, setLogOut } = loginWork.actions;
export default loginWork.reducer;
