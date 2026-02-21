import type { CartItemType } from "../types/cart";
import { discountRules } from "../data/discountRules";

export interface Totals {
    subtotal: number;
    tax: number;
    total: number;
}

const TAX_RATE = 0.1;

function round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateTotals(
    cart: CartItemType[],
    couponDiscount: number
): Totals {
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const ruleDiscount = discountRules
        .filter((rule) => rule.condition(cart))
        .reduce((sum, rule) => sum + rule.discount, 0);

    const totalDiscount = ruleDiscount + couponDiscount;

    const discountedSubtotal = Math.max(subtotal - totalDiscount, 0);

    const tax = discountedSubtotal * TAX_RATE;
    const total = discountedSubtotal + tax;

    return {
        subtotal: round(subtotal),
        tax: round(tax),
        total: round(total)
    };
}