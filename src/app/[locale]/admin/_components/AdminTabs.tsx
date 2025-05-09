"use client";

import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Translations } from "@/types/translations";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function AdminTabs({
    translations,
}: {
    translations: Translations;
}) {
    const { locale } = useParams();
    const pathname = usePathname();

    const tabs = [
        {
            id: crypto.randomUUID(),
            title: translations.admin.tabs.profile,
            href: Routes.ADMIN,
        },
        {
            id: crypto.randomUUID(),
            title: translations.admin.tabs.categories,
            href: `${Routes.ADMIN}/${Pages.CATEGORIES}`,
        },
        {
            id: crypto.randomUUID(),
            title: translations.admin.tabs.menuItems,
            href: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
        },
        {
            id: crypto.randomUUID(),
            title: translations.admin.tabs.users,
            href: `${Routes.ADMIN}/${Pages.USERS}`,
        },
        {
            id: crypto.randomUUID(),
            title: translations.admin.tabs.orders,
            href: `${Routes.ADMIN}/${Pages.ORDERS}`,
        },
    ];

    const isActiveTab = (href: string) => {
        const hrefArray = href.split("/");
        return hrefArray.length > 1
            ? pathname.startsWith(`/${locale}/${href}`)
            : pathname === `/${locale}/${href}`;
    };
    return (
        <nav className="mt-20">
            <ul className="flex items-center justify-center flex-wrap gap-4">
                {tabs.map((tab) => (
                    <li key={tab.id}>
                        <Link
                            href={`/${locale}/${tab.href}`}
                            className={` hover:!text-white ${
                                isActiveTab(tab.href)
                                    ? buttonVariants({ variant: "default" })
                                    : buttonVariants({ variant: "outline" })
                            }}`}
                        >
                            {tab.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
