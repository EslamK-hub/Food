import { getBestSellingProducts } from "@/server/db/products";

export default async function MenuPage() {
  const categories = await getBestSellingProducts();
  console.log(categories);
    return (
        <main>
            {categories.map((category) => (
              <section key={category.id}>
                <div className="container">
                  <h1>{ category.name }</h1>
                </div>
                </section>
            ))}
        </main>
    );
}
