import { VIPER_CONST } from "../commonConstant";
import { UpdateThemeData, UpdateThemeRequest } from "../slices/types";
import * as BaseApi from "../configs/api-config";

class SaveThemeService {
  private url = (action: string) => VIPER_CONST.base_url + action;
  /**
   * Login user
   * @param userName
   * @param password
   * @param privilege
   * @returns Token
   */
  public async updateThemeData(
    body: UpdateThemeData
  ): Promise<UpdateThemeRequest | undefined> {
    return BaseApi._post(this.url("updateTheme"),  body);
  }
}
const SaveThemeApi = new SaveThemeService();
export default SaveThemeApi;