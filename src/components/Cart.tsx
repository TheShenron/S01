import { useMemo } from "react";
import { useCart } from "../context/CartContext";
import { calculateTotals } from "../utils/calculateTotals";
import CartItem from "./CartItem";
import Coupon from "./Coupon";

export default function Cart() {
    const { cart, couponDiscount } = useCart();

    const totals = useMemo(
        () => calculateTotals(cart, couponDiscount),
        [cart, couponDiscount]
    );

    return (
        <div>
            <h2>Cart</h2>

            {cart.length === 0 && <p>Cart is empty</p>}

            {cart.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}

            <Coupon />

            <h3>Subtotal: ${totals.subtotal.toFixed(2)}</h3>
            <h3>Tax: ${totals.tax.toFixed(2)}</h3>
            <h2>Total: ${totals.total.toFixed(2)}</h2>
        </div>
    );
}