import { useSelector } from "react-redux";
import { showConfirm, showError } from "./components/Swal";
import { fetchAffiliate, loadSavedTheme, logOutState } from "./state/themeSlice";
import { Affiliate, Auth } from "./slices/types";
import { store } from "./app/store";


export function HandleAPIError(error: any) {
  if (error?.code === "ERR_NETWORK") {
    showError("Error", "Error");
  } else {
    showError("Error", error?.message);
  }
}

export async function logout(dispatch: any) {
  let confirmed = await showConfirm(
    "Confirm",
    "Are you sure, you want to logout?"
  );
  if (confirmed.isConfirmed) {
    // dispatch(loadSavedTheme(defaultThemeOptions));
    dispatch(logOutState());
  }
}

export async function _getAffiliate(response: any) {
  let newData: Affiliate[] = [];
  response.affiliates.forEach((data: any) => {
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
