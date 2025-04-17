import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ReduxProvider from "@/providers/ReduxProvider";
import { Directions, Languages } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";

export async function generateStaticParams() {
    return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }];
}

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    preload: true,
});

const cairo = Cairo({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    preload: true,
});

export const metadata: Metadata = {
    title: "My Pizza Restaurant",
    description: "The best pizza in town – freshly baked, always hot!",
    icons: {
        icon: "/favicon.ico",
    },
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
}>) {
    const locale = (await params).locale;
    return (
        <html
            lang={locale}
            dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
        >
            <body
                className={
                    locale === Languages.ARABIC
                        ? cairo.className
                        : roboto.className
                }
            >
                <NextAuthSessionProvider>
                    <ReduxProvider>
                        <Header></Header>
                        {children}
                        <Footer></Footer>
                        <Toaster></Toaster>
                    </ReduxProvider>
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}
