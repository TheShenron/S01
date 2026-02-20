import type { DiscountRule } from "../types/cart";

export const discountRules: DiscountRule[] = [
    {
        id: "bulk-mouse",
        condition: (cart) => {
            const mouse = cart.find((i) => i.id === 2);
            return !!mouse && mouse.quantity >= 3;
        },
        discount: 20
    }
];