// import AuthService from "@/src/services/auth/auth.service";
// import NextAuth, { AuthOptions, User, Session } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Username and Password",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "" },
//         password: { label: "Mot de passe", type: "password" },
//       },
//       async authorize(credentials, req): Promise<User | null> {
//         try {
//           if (!credentials?.email || !credentials?.password) {
//             throw new Error("Invalid credentials");
//           }

//           const authService = new AuthService();
//           const { email, password } = credentials;
//           // Add logic here to look up the user from the credentials supplied

//           const body = { email: email, password: password };
//           const user = await authService.login({ body });

//           if (user) return user;
//           //il manque le me

//           return null;
//         } catch (e) {
//           console.error(e);
//           return null;
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login",
//     // signOut: "/logout",
//     // error: "/error_auth",
//   },
//   callbacks: {
//     async jwt({ token, user }: { token: any; user: User }) {
//       return { ...token, ...user };
//     },

//     async session({
//       session,
//       token,
//       user,
//     }: {
//       session: Session;
//       token: any;
//       user: User;
//     }) {
//       return {
//         ...session,
//         user: { ...token },
//       };
//     },
//     async redirect({ url, baseUrl }: { url: any; baseUrl: any }) {
//       return baseUrl;
//     },
//   },
// };

// export default NextAuth(authOptions);
