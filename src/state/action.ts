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

export const setAffiliateId = (id: string) => ({
  type: "SET_AFFILIATE_ID",
  payload: id
});

export const affiliateTheme = (themeOptions: any) => ({ 
  type: "AFFLIATE_THEME",
  themeOptions
})

export const resetSiteData = () => ({ type: "RESET_SITE_DATA" })

