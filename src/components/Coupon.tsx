import { useState } from "react";
import { useCart } from "../context/CartContext";
import { validateCoupon } from "../utils/validateCoupon";

export default function Coupon() {
    const { setCouponDiscount } = useCart();
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const applyCoupon = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const discount = await validateCoupon(code);
            setCouponDiscount(discount);
        } catch (error) {
            console.error("Coupon validation failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Coupon code"
            />
            <button onClick={applyCoupon} disabled={loading}>
                {loading ? "Checking..." : "Apply"}
            </button>
        </div>
    );
}