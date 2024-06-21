import { Auth } from "../slices/types";
import * as BaseApi from "./base-api";

class AuthApiService {
  private url = (action: string) => "auth/" + action;

  /**
   * Login user
   * @param auth
   * @param password
   * @param themeOption
   * @param userName
   * @returns Token
   */
  public async login(
    auth: boolean,
    password: string,
    // themeOption: string,
    userName: string
  ): Promise<Auth> {
    return BaseApi._post(this.url("signin"), {
      auth,
      password,
      // themeOption,
      userName,
    });
  }
}
const AuthApi = new AuthApiService();
export default AuthApi;
