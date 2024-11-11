import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdministrationInterface, UserRoleInterface } from "./app_types";

declare module "next-auth" {
  interface Session {
    token: string | undefined;
    user: {
      id: string | number;
      nom: string;
      telephone: string;
      fonction?: string | null;
      uuid: string;
      image?: string;
      created_at: string;
      updated_at: string;
      token_type: string;
      expires_in: number | string;
    };
    administration: AdministrationInterface;
    json_code: UserRoleInterface;
  }

  interface User {
    id: string | number;
    nom: string;
    telephone: string;
    fonction?: string | null;
    uuid: string;
    image?: string;
    created_at: string;
    updated_at: string;
    token_type: string;
    expires_in: number | string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string | number;
    nom: string;
    telephone: string;
    fonction?: string | null;
    uuid: string;
    image?: string;
    created_at: string;
    updated_at: string;
    token_type: string;
    expires_in: number | string;
    administration: AdministrationInterface;
    json_code: UserRoleInterface;
  }
}
