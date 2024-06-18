import {  Auth } from "../slices/types";
import * as BaseApi from "./base-api";

class AuthApiService {
  private url = (action: string) => "auth/" + action;

  /**
   * Login user
   * @param userEmail
   * @param password
   * @param themeOption
   * @param userName
   * @returns Token
   */
  public async login(
    userEmail: string,
    password: string,
    themeOption: string,
    userName: string
  ): Promise<Auth> {
    return BaseApi._post(this.url("signin"), {
      userEmail,
      password,
      themeOption,
      userName,
    });
  }
}
const AuthApi = new AuthApiService();
export default AuthApi;
