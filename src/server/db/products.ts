import { cache } from "@/lib/cache";
import { db } from "@/lib/prisma";

export const getBestSellingProducts = cache(
    () => {
        const bestSellers = db.product.findMany({
            include: {
                sizes: true,
                extras: true,
            },
        });
        return bestSellers;
    },
    ["best-sellers"],
    { revalidate: 3600 }
);
