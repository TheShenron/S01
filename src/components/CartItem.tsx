import React from "react";
import { useCart } from "../context/CartContext";
import type { CartItemType } from "../types/cart";

interface Props {
    item: CartItemType;
}

function CartItem({ item }: Readonly<Props>) {
    const { updateQuantity, removeItem } = useCart();

    return (
        <div>
            {item.name} - ${item.price}
            <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                }
            />
            <button onClick={() => removeItem(item.id)}>
                Remove
            </button>
        </div>
    );
}

export default React.memo(CartItem);