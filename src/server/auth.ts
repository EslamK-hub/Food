import { Environments, Pages, Routes } from "@/constants/enums";
import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { Locale } from "@/i18n.config";
import { login } from "./_actions/auth";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    secret: process.env.NEXT_AUTH_SECRET,
    debug: process.env.NODE_ENV === Environments.DEV,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials, req) => {
                const currentUrl = req?.headers?.referer;
                const locale = currentUrl?.split("/")[3] as Locale;
                const res = await login(credentials, locale);
                if (res.status === 200 && res.user) {
                    return res.user;
                } else {
                    throw new Error(
                        JSON.stringify({
                            validationError: res.error,
                            responseError: res.message,
                        })
                    );
                }
            },
        }),
    ],
    adapter: PrismaAdapter(db),
    pages: {
        signIn: `/${Routes.AUTH}/${Pages.LOGIN}`,
    },
};
