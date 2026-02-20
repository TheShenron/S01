import {
    createContext,
    useContext,
    useState,
    ReactNode
} from "react";
import type { CartItemType, Product } from "../types/cart";

interface CartContextType {
    cart: CartItemType[];
    couponDiscount: number;
    addToCart: (product: Product) => void;
    updateQuantity: (id: number, quantity: number) => void;
    removeItem: (id: number) => void;
    setCouponDiscount: (discount: number) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItemType[]>([]);
    const [couponDiscount, setCouponDiscount] = useState<number>(0);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === product.id);

            if (existing) {
                existing.quantity += 1; // ❌ mutation
                return [...prev];
            }

            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                couponDiscount,
                addToCart,
                updateQuantity,
                removeItem,
                setCouponDiscount
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart(): CartContextType {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}