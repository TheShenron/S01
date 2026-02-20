import type { CartItemType } from "../types/cart";

export interface Totals {
    subtotal: number;
    tax: number;
    total: number;
}

export function calculateTotals(
    cart: CartItemType[],
    discount: number
): Totals {
    let subtotal = 0;

    cart.forEach((item) => {
        subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.1;
    const total = subtotal + tax - discount;

    return { subtotal, tax, total };
}