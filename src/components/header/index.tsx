import Link from "../link";
import Navbar from "./Navbar";
import CartButton from "./CartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthButtons from "./AuthButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

export default async function Header() {
    const locale = await getCurrentLocale();
    const initialSession = await getServerSession(authOptions);
    const translation = await getTrans(locale);
    return (
        <header className="py-4 md:py-6">
            <div className="container flex justify-between items-center gap-6 lg:gap-10">
                <Link
                    href={`/${locale}`}
                    className="text-primary font-semibold text-2xl"
                >
                    🍕 {translation.logo}
                </Link>
                <Navbar translations={translation} initialSession={initialSession}></Navbar>
                <div className="flex items-center gap-6 flex-1 justify-end">
                    <div className="hidden lg:flex lg:items-center lg:gap-6">
                        <AuthButtons
                            translations={translation}
                            initialSession={initialSession}
                        ></AuthButtons>
                        <LanguageSwitcher></LanguageSwitcher>
                    </div>
                    <CartButton></CartButton>
                </div>
            </div>
        </header>
    );
}
