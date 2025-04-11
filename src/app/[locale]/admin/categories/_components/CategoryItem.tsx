import { Category } from "@prisma/client";

async function CategoryItem({ category }: { category: Category }) {
    return (
        <li className="bg-gray-300 p-4 rounded-md flex justify-between">
            <h3 className="text-black font-medium text-lg flex-1">
                {category.name}
            </h3>
            <div>
                <span>edit</span>
                <span>delete</span>
            </div>
        </li>
    );
}

export default CategoryItem;
