import AuthService from "@/src/services/auth/auth.service";
import NextAuth, { AuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Username and Password",
      credentials: {
        username: { label: "Telephone", type: "tel", placeholder: "" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error("Identifiants invalides");
          }

          const authService = new AuthService();
          const { username, password } = credentials;

          const user = await authService.login({
            body: { username, password },
          });

          if (user) {
            return user;
          }

          return null;
        } catch (e) {
          console.error(e);
          throw new Error("Erreur d'authentification");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },

    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: any;
    }): Promise<Session> {
      
      session = { ...session, ...token };
      
      // console.log({ token, session, user });
      return session;
    },
  },
};

export default NextAuth(authOptions);
