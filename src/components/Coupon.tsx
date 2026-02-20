import { useState } from "react";
import { useCart } from "../context/CartContext";
import { validateCoupon } from "../utils/validateCoupon";

export default function Coupon() {
    const { setCouponDiscount } = useCart();
    const [code, setCode] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const applyCoupon = async () => {
        setLoading(true);
        const discount = await validateCoupon(code);
        setCouponDiscount(discount);
        setLoading(false);
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