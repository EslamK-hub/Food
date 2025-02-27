import React from "react";
import Link from "../link";
import { Routes } from "@/constants/enums";
import { ShoppingCart } from "lucide-react";

export default function CartButton() {
    return (
        <Link href={`/${Routes.CART}`} className="block relative group">
            <span className="absolute -top-4 start-4 w-5 h-5 text-sm bg-primary rounded-full text-white text-center">2</span>
            <ShoppingCart className={`text-accent group-hover:text-primary duration-200 transition-colors !w-6 !h-6`}></ShoppingCart>
        </Link>
    );
}
