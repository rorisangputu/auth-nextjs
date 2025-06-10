import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import db from "./db";
import { PrismaAdapter } from "@auth/prisma-adapter";

const adapter = PrismaAdapter(db);

export const { auth, handlers, signIn,  } = NextAuth({ 
    adapter: adapter,
    providers: [
        GitHub, 
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
               
                const user = await db.user.findFirst({
                    where: {
                        email: credentials.email,
                        password: credentials.password
                    }
                });

                if(!user){
                    throw new Error("Invalid credentials")
                }
                return user;
            },
        }),
    ],
});
