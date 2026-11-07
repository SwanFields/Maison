import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "@/data/products";

const CartContext = createContext(null);
const STORAGE_KEY = "orchidee-azur-cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (id, qty = 1) =>
    setItems((prev) => {
      const found = prev.find((item) => item.id === id);
      if (found) return prev.map((item) => (item.id === id ? { ...item, qty: item.qty + qty } : item));
      return [...prev, { id, qty }];
    });

  const setQty = (id, qty) =>
    setItems((prev) =>
      qty <= 0 ? prev.filter((item) => item.id !== id) : prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );

  const removeItem = (id) => setItems((prev) => prev.filter((item) => item.id !== id));
  const clear = () => setItems([]);

  const detailed = useMemo(
    () =>
      items
        .map((item) => ({ ...item, product: products.find((p) => p.id === item.id) }))
        .filter((item) => Boolean(item.product)),
    [items]
  );

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = detailed.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ items: detailed, addItem, setQty, removeItem, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);