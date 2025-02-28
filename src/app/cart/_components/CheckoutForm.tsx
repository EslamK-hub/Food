"use client";

import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";

export default function CheckoutForm() {
    const cart = useAppSelector(selectCartItems)
    return <div>CheckoutForm</div>;
}
