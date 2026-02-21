import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
    return (
        <div>
            <h1>Smart Shopping Cart</h1>
            <ProductList />
            <Cart />
        </div>
    );
}