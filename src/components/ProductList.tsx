import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductList() {
    const { addToCart } = useCart();

    return (
        <div>
            <h2>Products</h2>
            {products.map((p) => (
                <div key={p.id}>
                    {p.name} - ${p.price}
                    <button onClick={() => addToCart(p)}>Add</button>
                </div>
            ))}
        </div>
    );
}