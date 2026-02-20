import { useCart } from "../context/CartContext";
import { calculateTotals } from "../utils/calculateTotals";
import CartItem from "./CartItem";
import Coupon from "./Coupon";

export default function Cart() {
    const { cart, couponDiscount } = useCart();

    const totals = calculateTotals(cart, couponDiscount);

    return (
        <div>
            <h2>Cart</h2>

            {cart.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}

            <Coupon />

            <h3>Subtotal: ${totals.subtotal}</h3>
            <h3>Tax: ${totals.tax}</h3>
            <h2>Total: ${totals.total}</h2>
        </div>
    );
}