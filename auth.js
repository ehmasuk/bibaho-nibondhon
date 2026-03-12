import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      authorize: async (credentials) => {
        try {
          const adminUser = process.env.ADMIN_USER;
          const adminPass = process.env.ADMIN_PASS;

          // 1. Check Admin
          if (credentials.nid === adminUser && credentials.password === adminPass) {
            return { id: "admin", nid: adminUser, role: "ADMIN" };
          }

          // 2. Check Kaji (if licenseNumber is provided)
          if (credentials.licenseNumber) {
            const kaji = await prisma.kaji.findUnique({ where: { licenseNumber: credentials.licenseNumber } });
            if (kaji && await bcrypt.compare(credentials.password, kaji.password)) {
              return { id: kaji.id, licenseNumber: kaji.licenseNumber, role: "KAJI" };
            }
          }

          // 3. Check User (if nid is provided)
          if (credentials.nid) {
            const user = await prisma.user.findUnique({ where: { nid: credentials.nid } });
            if (user && await bcrypt.compare(credentials.password, user.password)) {
              return { id: user.id, nid: user.nid, role: "USER" };
            }
          }

          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.nid = user.nid;
        token.licenseNumber = user.licenseNumber;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.nid = token.nid;
        session.user.licenseNumber = token.licenseNumber;
      }
      return session;
    },
  },
});
