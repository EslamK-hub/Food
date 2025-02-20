import MenuItem from "./MenuItem";
import { ProductWithRelations } from "@/types/product";

export default function Menu({ items }: { items: ProductWithRelations[] }) {
    return items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {items.map((item) => (
                <MenuItem key={item.id} item={item}></MenuItem>
            ))}
        </div>
    ) : (
        <p className="text-accent text-center">No Products found</p>
    );
}
