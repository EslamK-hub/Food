"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatCurrency } from "@/lib/formatters";
import { Checkbox } from "../ui/checkbox";
import { Extra, Size } from "@prisma/client";
import { ProductWithRelations } from "@/types/product";

export default function AddToCartButton({ item }: { item: ProductWithRelations }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    size="lg"
                    className="mt-4 text-white px-8 rounded-full"
                >
                    <span>Add To Cart</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                <DialogHeader className="flex items-center">
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={200}
                    ></Image>
                    <DialogTitle>{item.name}</DialogTitle>
                    <DialogDescription className="text-center">
                        {item.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-10">
                    <div className="space-y-4 text-center">
                        <Label htmlFor="pick-size">Pick your size</Label>
                        <PickSize sizes={item.sizes} item={item}></PickSize>
                    </div>
                    <div className="space-y-4 text-center">
                        <Label htmlFor="add-extras">Any extras?</Label>
                        <Extras extras={item.extras}></Extras>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full h-10">Add To Cart</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        //
    );
}

function PickSize({ sizes, item }: { sizes: Size[], item: ProductWithRelations }) {

    return (
        <RadioGroup defaultValue="comfortable">
            {sizes.map((size) => (
                <div
                    key={size.id}
                    className="flex items-center space-x-2 border border-gray-100 p-4 rounded-md"
                >
                    <RadioGroupItem value="default" id={size.id} />
                    <Label htmlFor={size.id}>
                        {size.name} {formatCurrency(size.price + item.basePrice)}
                    </Label>
                </div>
            ))}
        </RadioGroup>
    );
}

function Extras({ extras }: { extras: Extra[] }) {
    return extras.map((extra) => (
        <div
            key={extra.id}
            className="flex items-center space-x-2 border border-gray-100 p-4 rounded-md"
        >
            <Checkbox id={extra.id} />
            <label
                htmlFor={extra.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {extra.name} {formatCurrency(extra.price)}
            </label>
        </div>
    ));
}
