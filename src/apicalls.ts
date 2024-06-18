import { VIPER_CONST } from "./commonConstant";
import { LoginRequest, UpdateTheme } from "./types";

export async function getaffiliates(data: any) {
  let body = {
    username: VIPER_CONST.alwaysOnUsername,
    sessionid: VIPER_CONST.alwaysOnSessionid,
    failstatus: 0,
    request: "data",
  };

  console.log(`Request For ${VIPER_CONST.base_url}getaffiliates`, body);
  try {
    const response = fetch(`${VIPER_CONST.base_url}getaffiliates`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const responseData = (await response).json();
    console.log(
      `Response For ${VIPER_CONST.base_url}getaffiliates`,
      await responseData
    );

    return responseData;
  } catch (error) {
    return error;
  }
}

export async function updateTheme(data: UpdateTheme) {
  let body = {
    username: VIPER_CONST.alwaysOnUsername,
    sessionid: VIPER_CONST.alwaysOnSessionid,
    failstatus: 0,
    request: data,
  };

  console.log(`Request For ${VIPER_CONST.base_url}updatetheme`, body);
  try {
    const response = fetch(`${VIPER_CONST.base_url}updatetheme`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const responseData = (await response).json();
    console.log(
      `Response For ${VIPER_CONST.base_url}updatetheme`,
      await responseData
    );

    return responseData;
  } catch (error) {
    return error;
  }
}

export async function getPublishRequests() {
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
}

export async function getAuthorizedLogin(data: LoginRequest) {
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
    return error;
  }
}
