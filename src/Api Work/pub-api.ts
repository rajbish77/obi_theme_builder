import { VIPER_CONST } from "../commonConstant";
import { Publish, PublishersResponse } from "../slices/publisher/types";
import * as BaseApi from "./base-api";

class PubApiService {
  private url = (action: string) => VIPER_CONST.base_url + action;

  public async PublishReq(body: {
    username: string,
    sessionid: string,
    failstatus: number,
  }): Promise<PublishersResponse> {
    return BaseApi._post<PublishersResponse>(this.url("getpublishrequests"), body);
  }
}

const PubApi = new PubApiService();
export default PubApi;
