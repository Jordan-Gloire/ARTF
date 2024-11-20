import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdministrationInterface, UserRoleInterface } from "./app_types";

declare module "next-auth" {
  interface Session {
    token: string;
    user: UserInterface;
    administration?: AdministrationInterface;
    json_code?: UserRoleInterface;
    organisation: {
      id: number;
      nom: string;
      sigle: string;
      uuid: string;
      created_at: string;
      updated_at: string;
    };
  }

  interface User {
    token: string;
    user: UserInterface;
    administration?: AdministrationInterface;
    json_code?: UserRoleInterface;
  }

  interface UserInterface {
    id: number;
    roles: "ROLE_USER" | "ROLE_ADMIN";
    telephone: string;
    nom: string;
    uuid: string;
    image?: string;
    created_at: string;
    updated_at: string;
    id_organisation: {
      id: number;
      nom: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token: string;
    iat: string;
    exp: string;
    jti: string;
    user: UserInterface;
    administration?: AdministrationInterface;
    json_code?: UserRoleInterface;
    organisation: {
      id: number;
      nom: string;
      sigle: string;
      uuid: string;
      created_at: string;
      updated_at: string;
    };
  }
}
