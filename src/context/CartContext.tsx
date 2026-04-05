'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Product } from '@/data/menuData';
import { DELIVERY_FEE } from '@/data/menuData';

/* ═══════════════════════════════════════════════
   Cart Types
   ═══════════════════════════════════════════════ */

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderType = 'preorder' | 'footstep' | null;

interface CartContextValue {
  items: CartItem[];
  orderType: OrderType;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;

  // Cart actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // UI actions
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;

  // Order type
  setOrderType: (type: OrderType) => void;

  // Computed
  totalItems: number;
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
}

/* ═══════════════════════════════════════════════
   Context
   ═══════════════════════════════════════════════ */

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

/* ═══════════════════════════════════════════════
   Provider
   ═══════════════════════════════════════════════ */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.product.id !== productId));
      return;
    }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId ? { ...i, quantity } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setOrderType(null);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const openCheckout = useCallback(() => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, []);
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  // Computed values
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const deliveryCharge = orderType === 'footstep' ? DELIVERY_FEE : 0;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <CartContext.Provider
      value={{
        items,
        orderType,
        isCartOpen,
        isCheckoutOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        openCheckout,
        closeCheckout,
        setOrderType,
        totalItems,
        subtotal,
        deliveryCharge,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
