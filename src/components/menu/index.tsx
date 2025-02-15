/* eslint-disable @typescript-eslint/no-explicit-any */
import MenuItem from "./MenuItem";

export default function Menu({ items }: { items: any }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {items.map((item) => (
                <MenuItem key={item.id} item={item}></MenuItem>
            ))}
        </div>
    );
}
