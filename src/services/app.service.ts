import ApiServiceType from "@/types/apiServiceType";
import ApiService from "./api.service";
import { DefaultAppRowTypeInterface, ExtendedRowType } from "@/types/app_types";

export default class AppService extends ApiService {
  endpoint(): string {
    return "/";
  }

  async getNextPage<T extends ExtendedRowType<DefaultAppRowTypeInterface>>(
    url: string
  ): Promise<ApiServiceType.ListResponse<T>> {
    const response = await this.get({ url: url });
    if (response.ok) return await response.json();

    throw new Error("erreur");
  }
}
