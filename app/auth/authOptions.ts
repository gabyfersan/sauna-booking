import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Postadress" },
        password: {
          label: "Lösenord",
          type: "password",
          placeholder: "Lösenord",
        },
      },
      async authorize(credentials, req) {
        if (!credentials!.email || !credentials!.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials!.email },
        });
        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.hashedPassword!
        );
        return passwordMatch ? user : null;
      },
    }),

    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    session: async ({ session, token, user }: any) => {
      if (session?.user?.email) {
        const userData = await prisma.user.findUnique({
          where: { email: session.user.email }, // Assuming user data is identified by email
          select: { id: true }, // Select the fields you need (e.g., id)
        });
        if (userData) {
          session.user.id = userData.id; // Add the id to the session object
        }
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      return "/";
    },
  },
};

export default authOptions;
