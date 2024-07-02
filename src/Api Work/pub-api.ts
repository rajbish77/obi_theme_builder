import { VIPER_CONST } from "../commonConstant";
import { Publish, PublishersResponse } from "../slices/publisher/types";
import * as BaseApi from "../configs/api-config";
import { body } from "../slices/types";

class PubApiService {
  private url = (action: string) => VIPER_CONST.base_url + action;

  public async PublishReq(
    body: body
  ): Promise<PublishersResponse | undefined> {
    return BaseApi._post(this.url("getpublishrequests"), body);
  }
}

const PubApi = new PubApiService();
export default PubApi;
