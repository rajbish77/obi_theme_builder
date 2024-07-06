import { VIPER_CONST } from "../commonConstant";
import { affilateDataBody,  affilatiDataRequest } from "../slices/types";
import * as BaseApi from "./api-config";

class AffiliateApi {
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
  public async affilate(
    body: affilateDataBody
  ): Promise<affilatiDataRequest | undefined> {
    return BaseApi._post(this.url("getaffiliates"),  body);
  }
}
const AffData = new AffiliateApi();
export default AffData;
