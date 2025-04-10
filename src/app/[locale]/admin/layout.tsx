import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import AdminTabs from "./_components/AdminTabs";

export default async function AdminLayout({
    params,
    children,
}: {
    params: Promise<{ locale: Locale }>;
    children: React.ReactNode;
}) {
    const { locale } = await params;
    const translations = await getTrans(locale);
    return (
        <>
            <AdminTabs translations={translations}></AdminTabs>
            {children}
        </>
    );
}
