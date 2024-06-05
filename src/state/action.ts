import { Affiliate } from "../slices/types";

export const fetchAffiliate = (affiliate: Affiliate[]) => ({
  type: "FETCH_AFFLIATE",
  payload: affiliate,
});

export const loadSavedTheme = (themeOptions: any) => ({
  type: "LOAD_THEME",
  themeOptions,
});

export const logOutSate = () => ({ type: "LOGOUT" });
