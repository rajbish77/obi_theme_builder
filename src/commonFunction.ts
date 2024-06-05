import { useSelector } from "react-redux";
import { showConfirm, showError } from "./components/Swal";
import { fetchAffiliate, loadSavedTheme, logOutSate } from "./state/action";
import { Affiliate, Auth,  } from "./slices/types";

export function HandleAPIError(error: any) {
    if (error?.code === "ERR_NETWORK") {
      showError("Error", "Error");
    } else {
      showError("Error", error?.message);
    }
}