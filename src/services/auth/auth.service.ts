import ApiServiceType from "@/types/apiServiceType";
import ApiService from "../api.service";
import { User } from "next-auth";

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number | string;
};

type MeReponse = {
  email_verified_at: string | null | undefined;
  created_at: string;
  updated_at: string;
  id: string | number;
  name: string;
  email: string;
};

export default class AuthService {
  endpoint(): string {
    return "/auth/";
  }

  async login({
    body,
  }: {
    body: ApiServiceType.BodyClassic;
  }): Promise<User | null> {
    try {
      const response = await this.post({
        endPointOption: "login",
        body,
        token: "auth",
      });

      if (response.ok) {
        const loginResponse: LoginResponse = await response.json();
        const me = await this.me({ token: loginResponse.access_token });
        if (me && Object.entries(me).length > 0) {
          const user: User = { ...loginResponse, ...me };
          return user;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  async me({ token }: { token?: string }): Promise<MeReponse | null> {
    try {
      const response = await this.post({
        endPointOption: "me",
        body: null,
        token: token,
      });

      if (response.ok) {
        return await response.json();
      }

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
