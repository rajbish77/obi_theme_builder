import axios, { AxiosResponse } from "axios";
import { AppError } from "../errors/app-errors";
import { store } from "../app/store";
import { VIPER_CONST, VIPER_URL } from "../commonConstant";
import { router } from "../router";
import { showError } from "../components/Swal";

const appAxios = axios.create({
  baseURL: VIPER_URL,
});

appAxios.interceptors.request.use((conf) => {
  const user = store.getState().logIn; // Access the entire logIn state
  if (user.auth) {
    conf.headers = {
      ...conf.headers,
      // Authorization: `Bearer ${logIn}`,
    } as any;
  }
  return conf;
});
appAxios.interceptors.response.use(
  (resp) => {
    if (resp.status === 401) {
      router.navigate("/login", {
        replace: true,
      });
    }
    return resp;
  },
  (err) => {
    if (err?.response?.status === 401) {
      router.navigate("/login", {
        replace: true,
      });
      throw new AppError(
        401,
        "Your session has expired. Please login to continue..."
      );
    }
    throw err;
  }
);

export const GetPhoto = (photo: string) => {
  return `${VIPER_URL}/${photo}`;
};
export { appAxios };
