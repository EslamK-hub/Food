/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export default function MenuItem({ item }: {item: any}) {
    return (
        <div>
            <div className="relative w-48 h-48 mx-auto">
                <Image
                    src={item.image}
                    alt={item.name}
                    className="object-cover"
                    fill
                />
            </div>
            <div className="flex justify-between items-center mb-4">
                <h5 className="font-semibold text-xl my-3">{item.name}</h5>
                <strong className="text-accent">
                    {formatCurrency(item.price)}
                </strong>
            </div>
            <p className="text-gray-500 text-sm line-clamp-3">
                {item.description}
            </p>
            <AddToCartButton item={item}></AddToCartButton>
        </div>
    );
}
