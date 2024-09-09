import { showConfirm, showError } from "./components/Swal";
// import { loadSavedTheme } from "./state/themeSlice";
import { Affiliate, Auth } from "./types";
import { store } from "./app/store";
import { logOut } from "./slices/auth-slice";
import { useAppDispatch } from "./app/hooks";
import { fetchAffiliate } from "./slices/commonSlice/fetchAffiliate";
import { clearAffiliate } from "./slices/affiliateTheme";
import { setPreview } from "./slices/commonSlice/preview";
import { defaultThemeOptions } from "./defaultTheme";

export function HandleAPIError(error: any) {
  if (error?.code === "ERR_NETWORK") {
    showError("Error", "Error");
  } else {
    showError("Error", error?.message);
  }
}

export async function logout(data: any) {
  let confirmed = await showConfirm(
    "Confirm",
    "Are you sure, you want to logout?"
  );
  if (confirmed?.isConfirmed) {
    store.dispatch(logOut(data));
    store.dispatch(clearAffiliate())
    // store.dispatch(setPreview(""))
  }
}

export async function _getAffiliate(response: any) {
  let newData: Affiliate[] = [];
  response.forEach((data: any) => {
    let newAffiliate = {
      id: data.affiliateid,
      name: data.affiliatename,
    };
    newData.push(newAffiliate);
  });
  store.dispatch(fetchAffiliate(newData));
}

export function getEditorLoginStatus(auth: Auth) {
  let flag = false;
  if (auth.auth === true && auth.editor === "Y") {
    flag = true;
  }

  return flag;
}

export function getPublisherLoginStatus(auth: Auth) {
  let flag = false;
  if (auth.auth === true && auth.publisher === "Y") {
    flag = true;
  }

  return flag;
}

export function setByPath(obj: any, path: string, value: any) {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (i === keys.length - 1) {
      current[key] = value;
    } else {
      current = current[key];
    }
  }
}