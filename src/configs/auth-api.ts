import { VIPER_CONST } from "../commonConstant";
import { IAuth } from "../slices/types";
import * as BaseApi from "./api-config";

class PubApiService {
  private url = (action: string) => VIPER_CONST.base_url + action;

  /**
   * Login user
   * @param userName
   * @param password
   * @param privilege
   * @returns Token
   */
  public async login(
    body: {
      username: string;
      sessionid: string;
      failstatus: number;
      request: {
          username: string;
          password: string;
          privilege: string;
      };
  }
  ): Promise<IAuth | undefined> {
    return BaseApi._post(this.url("getauthorizedlogin"),  body);
  }
}
const AuthApi = new PubApiService();
export default AuthApi;
