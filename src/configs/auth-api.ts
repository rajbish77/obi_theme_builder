import { VIPER_CONST } from "../commonConstant";
import { Auth, body, IAuth } from "../slices/types";
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
    body: body
  ): Promise<Auth | undefined> {
    return BaseApi._post(this.url("getauthorizedlogin"),  body);
  }
}
const AuthApi = new PubApiService();
export default AuthApi;
