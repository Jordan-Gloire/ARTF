import ApiServiceType from "@/types/apiServiceType";
import { getAuthSession } from "@/src/lib/auth";
import { sendRequestServer } from "../actions/app/app-actions";

export default class ApiService {
  protected endpoint(): string {
    throw new Error("The method 'endpoint' is not implemented.");
  }

  async post({
    endPointOption = "",
    url,
    body,
    headers,
    token,
  }: {
    endPointOption?: string;
    url?: string;
    body: ApiServiceType.BodyClassic | null;
    headers?: ApiServiceType.AppHeaders | null;
    token?: string | null;
  }): Promise<Response> {
    return await this.sendRequest({
      method: "POST",
      endPointOption,
      url,
      body,
      headers,
      token,
    });
  }

  async get({
    endPointOption = "",
    url,
    headers,
    token,
  }: {
    endPointOption?: string;
    url?: string;
    headers?: ApiServiceType.AppHeaders | null;
    token?: string | null;
  }): Promise<Response> {
    return await this.sendRequest({
      method: "GET",
      endPointOption,
      url,
      body: null,
      headers,
      token,
    });
  }

  async patch({
    endPointOption = "",
    url,
    body,
    headers,
    token,
  }: {
    endPointOption?: string;
    url?: string;
    body: ApiServiceType.BodyClassic | null;
    headers?: ApiServiceType.AppHeaders | null;
    token?: string | null;
  }): Promise<Response> {
    return await this.sendRequest({
      method: "PATCH",
      endPointOption,
      url,
      body,
      headers,
      token,
    });
  }

  async put({
    endPointOption = "",
    url,
    body,
    headers,
    token,
  }: {
    endPointOption?: string;
    url?: string;
    body: ApiServiceType.BodyClassic | null;
    headers?: ApiServiceType.AppHeaders | null;
    token?: string | null;
  }): Promise<Response> {
    return await this.sendRequest({
      method: "PUT",
      endPointOption,
      url,
      body,
      headers,
      token,
    });
  }

  async delete({
    endPointOption = "",
    url,
    headers,
    token,
  }: {
    endPointOption: string;
    url?: string;
    headers?: ApiServiceType.AppHeaders | null;
    token?: string | null;
  }): Promise<Response> {
    return await this.sendRequest({
      method: "DELETE",
      endPointOption,
      url,
      body: null,
      headers,
      token,
    });
  }

  async getDataSelectTable<T>(tables: string[]): Promise<T> {
    try {
      // tables.map((table) =>table.endsWith("s") ? table.slice(0, -1) : table),
      const body = {
        data_select: tables,
      };
      const response = await this.sendRequest({
        method: "POST",
        endPointOption: "",
        body,
      });
      if (response.ok) return await response.json();
      throw new Error(await response.json());
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }

  async sendRequest({
    method,
    endPointOption = "",
    url,
    body,
    headers,
    token,
  }: {
    method: string;
    endPointOption: string;
    url?: string;
    body: ApiServiceType.BodyClassic | null;
    headers?: ApiServiceType.AppHeaders | null;
    token?: string | null;
  }): Promise<Response> {
    try {
      const apiUrl = `${this.endpoint()}${endPointOption}`;
      const data = JSON.stringify(body ?? {});
      const appHeaders = new Headers();
      let userToken = token;
      appHeaders.append("Content-Type", "application/json");

      // Compléter les en-têtes
      if (headers) {
        Object.keys(headers).forEach((key) => {
          appHeaders.append(key, headers[key]);
        });
      }

      if (!token) {
        const session = await getAuthSession();
        userToken = session?.user.access_token;
      }

      if (userToken && userToken != "auth") {
        //on ajoute le token si oui
        appHeaders.append("Authorization", "Bearer " + userToken);
      }

      return sendRequestServer({
        url: url ?? process.env.NEXT_PUBLIC_API_URL + apiUrl,
        headers: appHeaders,
        method: method,
        body: data,
      });

      // if (method == "GET") {
      //   return await fetch(process.env.NEXT_PUBLIC_API_URL + apiUrl, {
      //     method: method,
      //     headers: appHeaders,
      //     cache: "no-store",
      //   });
      // }
      // return await fetch(process.env.NEXT_PUBLIC_API_URL + apiUrl, {
      //   method: method,
      //   body: data,
      //   headers: appHeaders,
      //   cache: "no-store",
      // });
    } catch (error: any) {
      console.error("Error:", error);
      throw new Error(error);
    }
  }
}
