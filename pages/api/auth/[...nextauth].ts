import AuthService from "@/src/services/auth/auth.service";
import NextAuth, { AuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Username and Password",
      credentials: {
        email: { label: "Numero", type: "tel", placeholder: "" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid credentials");
          }

          const authService = new AuthService();
          const { email, password } = credentials;

          const user = await authService.login({ body: { username : email, password } });

          if (user) {
            // Assurez-vous que l'objet user retourné correspond à l'interface User définie
            return user;
          }

          return null;
        } catch (e) {
          console.error(e);
          return null;
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
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User;
      account?: any;
    }): Promise<JWT> {
      if (user) {
        // Lors de la connexion initiale
        token = { ...token, ...user };
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      // a tester
      session.user = token as any;
      session.token = token.token_type + " " + token.access_token; // Assurez-vous que ces propriétés existent dans votre token
      session.administration = token.administration;
      // session.json_code_value = token.json_code_value;
      return session;
    },

    async redirect({
      url,
      baseUrl,
    }: {
      url: string;
      baseUrl: string;
    }): Promise<string> {
      // Vous pouvez personnaliser la logique de redirection ici si nécessaire
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
};

export default NextAuth(authOptions);
