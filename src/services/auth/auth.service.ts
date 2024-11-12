import ApiServiceType from "@/types/apiServiceType";
import { Session, User } from "next-auth";

export default class AuthService {
  endpoint(): string {
    return "/api/";
  }

  async login({
    body,
  }: {
    body: ApiServiceType.BodyClassic;
  }): Promise<User | null> {
    try {
      const url = process.env.NEXT_PUBLIC_API_URL?.replace("v1", "") + "login_check";
      const data = JSON.stringify(body);
      const appHeaders = new Headers();
      appHeaders.append("Content-Type", "application/json");
      // console.log({ url, data, body });

      const response = await fetch(url, {
        method: "POST",
        body: data,
        headers: appHeaders,
        cache: "no-store",
      });

      if (response.ok) {
        const rep = await response.json();
        // console.log({ rep });
        return rep;
      }
      console.log(
        "status",
        response.status,
        response.statusText,
        await response.text()
      );

      return null;
    } catch (e) {
      return null;
    }
  }

  async post({
    endPointOption,
    body,
    headers,
    token,
  }: {
    endPointOption: string;
    body: ApiServiceType.BodyClassic | null;
    headers?: ApiServiceType.AppHeaders | null;
    token?: string | null;
  }): Promise<Response> {
    try {
      const url = `${this.endpoint()}${endPointOption}`;
      const data = JSON.stringify(body ?? {});
      const appHeaders = new Headers();
      let userToken = token;
      appHeaders.append("Content-Type", "application/json");
      if (headers) {
        Object.keys(headers).forEach((key) => {
          appHeaders.append(key, headers[key]);
        });
      }

      if (userToken && userToken != "auth") {
        //on ajoute le token si oui
        appHeaders.append("Authorization", "Bearer " + userToken);
      }

      return await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
        method: "POST",
        body: data,
        headers: appHeaders,
        cache: "no-store",
      });
    } catch (e: any) {
      console.error("Error:", e);
      throw new Error(e);
    }
  }
}