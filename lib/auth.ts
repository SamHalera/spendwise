import prisma from "@/db";
import { SHA256 } from "crypto-js";
import encBase64 from "crypto-js/enc-base64";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_SECRET) {
  throw new Error("Google API credentials are missing!");
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          return null;
        }
        const newHash = SHA256(credentials.password + user?.salt).toString(
          encBase64
        );
        const isPasswordValid = newHash === user?.hash;
        if (!isPasswordValid) {
          return null;
        }
        return {
          id: user.id + "",
          email: user.email,
          token: user.token,
        };
      },
    }),
  ],
  //   callbacks : {
  //     async signIn({account, profile}){
  //         if(account?.provider === "google"){
  //             return profile?.email_verified
  //         }
  //     }
  //   }
};
