import { VIPER_CONST } from "../commonConstant";
import { affilateBody,  affilatiRequestId } from "../types";
import * as BaseApi from "../configs/api-config";

class AffiliateApiService {
  private url = (action: string) => VIPER_CONST.base_url + action;
  fetchThemeById: any;
  getAffiliateTheme: any;

  /**
   * Login user
   * @param userName
   * @param password
   * @param privilege
   * @returns Token
   */
  public async affilateData(
    body: affilateBody
  ): Promise<affilatiRequestId | undefined> {
    return BaseApi._post(this.url("getaffiliates"),  body);
  }
}
const AffiApi = new AffiliateApiService();
export default AffiApi;
