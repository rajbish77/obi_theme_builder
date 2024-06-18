import axios from "axios";
import { AppError } from "../errors/app-errors";
import { store } from "../app/store";
import { VIPER_CONST, VIPER_URL } from "../commonConstant";
import { router } from "../router";
import { parseISO } from "date-fns";

const appAxios = axios.create({
  baseURL: VIPER_URL,
});

// appAxios.interceptors.request.use((conf) => {
//   const user = store.getState().logIn; // Access the entire logIn state
//   if (user.auth) {
//     conf.headers = {
//       ...conf.headers,
//       Authorization: `Bearer ${user.tokens?.accessTokens}`, // Corrected access to tokens
//     } as any;
//   }
//   return conf;
// });
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

export const _post = async <T>(url: string, data: any) => {
  let body = {
    username: VIPER_CONST.alwaysOnUsername,
    sessionid: VIPER_CONST.alwaysOnSessionid,
    failstatus: 0,
    request: data,
  };

  console.log(`Request For ${VIPER_CONST.base_url}getauthorizedlogin`, body);

  try {
    const response = fetch(`${VIPER_CONST.base_url}getauthorizedlogin`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const responseData = (await response).json();
    console.log(
      `Response For ${VIPER_CONST.base_url}getauthorizedlogin`,
      await responseData
    );

    return responseData;
  } catch (error) {
    console.log(error);
  }
};

export const _get = async <T>(api: string, data: any) => {
  let body = {
    username: VIPER_CONST.alwaysOnUsername,
    sessionid: VIPER_CONST.alwaysOnSessionid,
    failstatus: 0,
    request: {},
  };

  console.log(`Request For ${VIPER_CONST.base_url}getpublishrequests`, body);
  try {
    const response = fetch(`${VIPER_CONST.base_url}getpublishrequests`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const responseData = (await response).json();
    console.log(
      `Response For ${VIPER_CONST.base_url}getpublishrequests`,
      await responseData
    );

    return responseData;
  } catch (error) {
    return error;
  }
};

export const GetPhoto = (photo: string) => {
  return `${VIPER_URL}/${photo}`;
};
export { appAxios };
