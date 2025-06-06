import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

export default async function Footer() {
    const locale = await getCurrentLocale();
    const { copyRight } = await getTrans(locale);
    return (
        <footer className="border-t p-8 text-center text-accent">
            <div className="container">
                <p>{ copyRight }</p>
            </div>
        </footer>
    );
}
