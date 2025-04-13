import { Category } from "@prisma/client";
import EditCategory from "./EditCategory";
import getTrans from "@/lib/translation";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import DeleteCategory from "./DeleteCategory";

async function CategoryItem({ category }: { category: Category }) {
    const locale = await getCurrentLocale();
    const translations = await getTrans(locale);
    return (
        <li className="bg-gray-300 p-4 rounded-md flex justify-between">
            <h3 className="text-black font-medium text-lg flex-1">
                {category.name}
            </h3>
            <div className="flex items-center gap-2">
                <EditCategory translations={translations} category={category}></EditCategory>
                <DeleteCategory id={category.id}></DeleteCategory>
            </div>
        </li>
    );
}

export default CategoryItem;
