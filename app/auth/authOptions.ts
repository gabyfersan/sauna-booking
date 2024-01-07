import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  // callbacks: {
  //   session: async ({ session, user }) => {
  //     // Fetch additional user data from your database
  //     const userData = await prisma.user.findUnique({
  //       where: { email: user.email }, // Assuming user data is identified by email
  //       select: { id: true }, // Select the fields you need (e.g., id)
  //     });
  //     console.log("session auth", session, userData);
  //     if (userData) {
  //       session.user.id = userData.id; // Add the id to the session object
  //     }

  //     return session;
  //   },
  // },
  callbacks: {
    session: async ({ session, token, user }: any) => {
      // console.log("SESSION", session);
      // console.log("USER", user);
      //console.log("token", token);
      if (session?.user?.email) {
        const userData = await prisma.user.findUnique({
          where: { email: session.user.email }, // Assuming user data is identified by email
          select: { id: true }, // Select the fields you need (e.g., id)
        });
        //console.log("session auth", session, userData);
        if (userData) {
          session.user.id = userData.id; // Add the id to the session object
        }
      }

      return session;
    },
  },
};

export default authOptions;
