import { VIPER_CONST } from "../commonConstant";
import { UpdateThemeData, UpdateThemeResponse } from "../slices/types";
import * as BaseApi from "../configs/api-config";

class SaveThemeService {
  private url = (action: string) => VIPER_CONST.base_url + action;

  public async updateThemeData(
    body: UpdateThemeData
  ): Promise<UpdateThemeResponse> {
    try {
      const response = await BaseApi._post(this.url("updatetheme"), body);
      return response as UpdateThemeResponse;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

const SaveThemeApi = new SaveThemeService();
export default SaveThemeApi;
