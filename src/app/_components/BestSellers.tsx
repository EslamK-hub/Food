import MainHeading from "@/components/main-heading";
import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";

export default function BestSellers() {
    const bestSellers = [
        {
            id: 1,
            name: "Margherita",
            description: "Classic delight with 100% real mozzarella cheese",
            price: 10.99,
            image: "/assets/images/pizza.png",
        },
        {
            id: 2,
            name: "Pepperoni",
            description: "Spicy pepperoni with 100% real mozzarella cheese",
            price: 12.99,
            image: "/assets/images/pizza.png",
        },
        {
            id: 3,
            name: "Veggie Supreme",
            description: "Fresh vegetables with 100% real mozzarella cheese",
            price: 14.99,
            image: "/assets/images/pizza.png",
        },
    ];
    return (
        <section>
            <div className="container">
                <div className="text-center mb-4">
                    <MainHeading
                        title={`Our Best Sellers`}
                        subTitle={`Checkout`}
                    ></MainHeading>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {bestSellers.map((pizza) => (
                        <div key={pizza.id}>
                            <div className="relative w-48 h-48 mx-auto">
                                <Image
                                    src={pizza.image}
                                    alt={pizza.name}
                                    className="object-cover"
                                    fill
                                />
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <h5 className="font-semibold text-xl my-3">{pizza.name}</h5>
                                <strong className="text-accent">
                                    {formatCurrency(pizza.price)}
                                </strong>
                            </div>
                                <p className="text-gray-500 text-sm line-clamp-3">{pizza.description}</p>
                                <a href="#" className="btn btn-primary">
                                    Order Now
                                </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
