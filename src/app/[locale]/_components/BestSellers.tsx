import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { getBestSellingProducts } from "@/server/db/products";

export default async function BestSellers() {
    const bestSellers = await getBestSellingProducts(3);
    const locale = await getCurrentLocale();
    const { home } = await getTrans(locale);
    const { bestSeller } = home;

    //     [
    //     {
    //         id: 1,
    //         name: "Margherita",
    //         description: "Classic delight with 100% real mozzarella cheese",
    //         price: 10.99,
    //         image: "/assets/images/pizza.png",
    //     },
    //     {
    //         id: 2,
    //         name: "Pepperoni",
    //         description: "Spicy pepperoni with 100% real mozzarella cheese",
    //         price: 12.99,
    //         image: "/assets/images/pizza.png",
    //     },
    //     {
    //         id: 3,
    //         name: "Veggie Supreme",
    //         description: "Fresh vegetables with 100% real mozzarella cheese",
    //         price: 14.99,
    //         image: "/assets/images/pizza.png",
    //     },
    // ];
    return (
        <section>
            <div className="container">
                <div className="text-center mb-4">
                    <MainHeading
                        subTitle={bestSeller.checkOut}
                        title={bestSeller.OurBestSellers}
                    ></MainHeading>
                </div>
                <Menu items={bestSellers}></Menu>
            </div>
        </section>
    );
}
