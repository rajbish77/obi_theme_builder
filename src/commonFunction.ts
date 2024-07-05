import { showConfirm, showError } from "./components/Swal";
import { fetchAffiliate, loadSavedTheme } from "./state/themeSlice";
import { Affiliate, Auth } from "./slices/types";
import { store } from "./app/store";
import { logOut } from "./slices/logIn-slice";
import { useAppDispatch } from "./app/hooks";

export function HandleAPIError(error: any) {
  if (error?.code === "ERR_NETWORK") {
    showError("Error", "Error");
  } else {
    showError("Error", error?.message);
  }
}

export async function logout(authData: any) {
  const dispatch = useAppDispatch()
  let confirmed = await showConfirm(
    "Confirm",
    "Are you sure, you want to logout?"
  );
  if (confirmed.isConfirmed) {
    dispatch(logOut(authData));
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
