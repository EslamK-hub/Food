import Link from "../link";
import Navbar from "./Navbar";
import CartButton from "./CartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./LanguageSwitcher";

export default async function Header() {
    const locale = await getCurrentLocale();
    const { logo, navbar } = await getTrans(locale);
    return (
        <header className="py-4 md:py-6">
            <div className="container flex justify-between items-center gap-6 lg:gap-10">
                <Link
                    href={`/${locale}`}
                    className="text-primary font-semibold text-2xl"
                >
                    🍕 {logo}
                </Link>
                <Navbar translations={navbar}></Navbar>
                <LanguageSwitcher></LanguageSwitcher>
                <CartButton></CartButton>
            </div>
        </header>
    );
}
