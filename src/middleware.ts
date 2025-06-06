import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, LanguageType, Locale } from "./i18n.config";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { Pages, Routes } from "./constants/enums";
import { UserRole } from "@prisma/client";

function getLocale(request: NextRequest): string | undefined {
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    const locales: LanguageType[] = i18n.locales;
    const languages = new Negotiator({
        headers: negotiatorHeaders,
    }).languages();
    let locale = "";

    try {
        locale = matchLocale(languages, locales, i18n.defaultLocale);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
        locale = i18n.defaultLocale;
    }
    return locale;
}

export default withAuth(
    async function middleware(request: NextRequest) {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-url", request.url);

        const response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });

        const pathname = request.nextUrl.pathname;

        const pathnameIsMissingLocale = i18n.locales.every(
            (locale) => !pathname.startsWith(`/${locale}`)
        );

        if (pathnameIsMissingLocale) {
            const locale = getLocale(request);
            return NextResponse.redirect(
                new URL(`/${locale}${pathname}`, request.url)
            );
        }

        const currentLocale = request.url.split("/")[3] as Locale;
        const isAuth = await getToken({ req: request });
        const isAuthPage = pathname.startsWith(
            `/${currentLocale}/${Routes.AUTH}`
        );
        const protectedRoutes = [Routes.PROFILE, Routes.ADMIN];
        const isProtectedRoute = protectedRoutes.some((route) =>
            pathname.startsWith(`/${currentLocale}/${route}`)
        );

        // If the user is not authenticated and is trying to access a protected route,
        // redirect them to the login page.
        if (!isAuth && isProtectedRoute) {
            return NextResponse.redirect(
                new URL(
                    `/${currentLocale}/${Routes.AUTH}/${Pages.LOGIN}`,
                    request.url
                )
            );
        }

        // If the user is authenticated and is trying to access the auth page,
        // redirect them to the profile page.
        if (isAuthPage && isAuth) {
            const role = isAuth.role;
            if (role === UserRole.ADMIN) {
                return NextResponse.redirect(
                    new URL(`/${currentLocale}/${Routes.ADMIN}`, request.url)
                );
            }
            return NextResponse.redirect(
                new URL(`/${currentLocale}/${Routes.PROFILE}`, request.url)
            );
        }

        // If the user is authenticated and is trying to access the admin route,
        // check their role. If they are not an admin, redirect them to the profile page.
        if (
            isAuth &&
            pathname.startsWith(`/${currentLocale}/${Routes.ADMIN}`)
        ) {
            const role = isAuth.role;
            if (role !== UserRole.ADMIN) {
                return NextResponse.redirect(
                    new URL(`/${currentLocale}/${Routes.PROFILE}`, request.url)
                );
            }
        }

        return response;
    },
    {
        callbacks: {
            authorized() {
                return true;
            },
        },
    }
);

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
    ],
};
