import {
    createContext,
    useContext,
    useState,
    type ReactNode,
    useEffect,
    useCallback,
    useMemo
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

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "smart_cart";

function loadCart(): CartItemType[] {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (!stored) return [];

        const parsed: unknown = JSON.parse(stored);

        if (!Array.isArray(parsed)) return [];

        return parsed.filter((item): item is CartItemType => {
            return (
                typeof item.id === "number" &&
                typeof item.name === "string" &&
                typeof item.price === "number" &&
                typeof item.quantity === "number"
            );
        });
    } catch {
        return [];
    }
}

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [cart, setCart] = useState<CartItemType[]>(loadCart);
    const [couponDiscount, setCouponDiscount] = useState<number>(0);

    // ✅ Persist cart safely
    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = useCallback((product: Product) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === product.id);

            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prev, { ...product, quantity: 1 }];
        });
    }, []);

    const updateQuantity = useCallback((id: number, quantity: number) => {
        if (quantity < 1) return;

        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    }, []);

    const removeItem = useCallback((id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const value = useMemo(
        () => ({
            cart,
            couponDiscount,
            addToCart,
            updateQuantity,
            removeItem,
            setCouponDiscount
        }),
        [cart, couponDiscount, addToCart, updateQuantity, removeItem]
    );

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartContextType {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
}