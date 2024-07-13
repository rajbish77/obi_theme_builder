import { VIPER_CONST } from "../commonConstant";
import { buttonBody, IAuth, Requestpublish } from "../types";
import * as BaseApi from "../configs/api-config";

class Publish {
  private url = (action: string) => VIPER_CONST.base_url + action;

  /**
   * Login user
   * @param affiliateid
   * @param action
   * @returns Token
   */
  public async RequestPublish(
    body: buttonBody
  ): Promise<Requestpublish | undefined> {
    return BaseApi._post(this.url("updatetheme"), body);
  }
}
const PublishAPI = new Publish();
export default PublishAPI;
