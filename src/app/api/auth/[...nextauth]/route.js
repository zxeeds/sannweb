import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user.password) {
            return null;
          }

          // === BAGIAN BARU: CEK ACCOUNT LOCK ===
          const now = new Date();
          if (user.lockedUntil && user.lockedUntil > now) {
            // Account masih di-lock
            const minutesLeft = Math.ceil((user.lockedUntil - now) / (1000 * 60));
            throw new Error(`Account locked. Try again in ${minutesLeft} minutes.`);
          }

          const isPasswordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordMatch) {
            // === BAGIAN BARU: INCREMENT LOGIN ATTEMPTS ===
            const newAttempts = user.loginAttempts + 1;
            const shouldLock = newAttempts >= 5;
            
            await prisma.user.update({
              where: { id: user.id },
              data: {
                loginAttempts: newAttempts,
                lockedUntil: shouldLock ? 
                  new Date(Date.now() + 15 * 60 * 1000) : // Lock 15 menit
                  null
              }
            });

            if (shouldLock) {
              throw new Error("Too many failed attempts. Account locked for 15 minutes.");
            }
            
            return null;
          }

          // === BAGIAN BARU: RESET COUNTER JIKA BERHASIL ===
          if (user.loginAttempts > 0 || user.lockedUntil) {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                loginAttempts: 0,
                lockedUntil: null
              }
            });
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role, // Tambah role di return
          };
        } catch (error) {
          console.error("Error during authentication:", error);
          
          // === BAGIAN BARU: THROW ERROR UNTUK LOCK MESSAGE ===
          if (error.message.includes("locked") || error.message.includes("Too many")) {
            throw error; // Pass error message ke frontend
          }
          
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/home`;
      }
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
