import axios, { AxiosResponse } from "axios";
import { AppError } from "../errors/app-errors";
import { store } from "../app/store";
import { VIPER_CONST, VIPER_URL } from "../commonConstant";
import { router } from "../router";
import { showError } from "../components/Swal";
import qs from "qs";


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

export const _post = async <T>(api: string, data: any, headers: any = null) => {
  try {
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.post<T>(api, data, {
        headers,
      });
    } else {
      response = await appAxios.post<T>(api, data);
    }
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const _put = async <T>(api: string, data: any, headers: any = null) => {
  try {
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.put<T>(api, data, {
        headers,
      });
    } else {
      response = await appAxios.put<T>(api, data);
    }
    if (response.status === 200) {
      return response.data;
    } else {
      throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const _get = async <T>(
  api: string,
  data: any = null,
  headers: any = null
) => {
  try {
    let url = api;
    if (data) {
      url += `?${qs.stringify(data, {
        arrayFormat: "repeat",
        skipNulls: true,
      })}`;
    }
    console.log(url);
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.get<T>(url, {
        headers,
      });
    } else {
      response = await appAxios.get<T>(url);
    }
    if (response.status === 200) {
      return response.data;
    } else {
      throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const _patch = async <T>(
  api: string,
  data: any,
  headers: any = null
) => {
  try {
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.patch<T>(api, data, {
        headers,
      });
    } else {
      response = await appAxios.patch<T>(api, data);
    }
    if (response.status === 200) {
      return response.data;
    } else {
      throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const _delete = async <T>(
  api: string,
  data: any = null,
  headers: any = null
) => {
  try {
    let url = api;
    if (data) {
      url += "?";
      for (let key in data) {
        url = `${url}${key}=${data[key]}&`;
      }
      url = url.substring(0, url.length - 1);
    }
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.delete<T>(url, {
        headers,
      });
    } else {
      response = await appAxios.delete<T>(url);
    }
    if (response.status === 200) {
      return response.data;
    } else {
      throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const GetPhoto = (photo: string) => {
  return `${VIPER_URL}/${photo}`;
};
export { appAxios };
