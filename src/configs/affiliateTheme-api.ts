import { VIPER_CONST } from "../commonConstant";
import { affilateBody, affilateRequest } from "../slices/types";
import * as BaseApi from "./api-config";

class AffiliateApiService {
  private url = (action: string) => VIPER_CONST.base_url + action;

  /**
   * Login user
   * @param userName
   * @param password
   * @param privilege
   * @returns Token
   */
  public async affilateData(
    body: affilateBody
  ): Promise<affilateRequest | undefined> {
    return BaseApi._post(this.url("getaffiliates"),  body);
  }
}
const AffiApi = new AffiliateApiService();
export default AffiApi;
