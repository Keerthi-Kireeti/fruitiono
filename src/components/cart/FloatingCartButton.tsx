'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function FloatingCartButton() {
  const { totalItems, openCart, grandTotal } = useCart();

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.button
        className="floating-cart"
        onClick={openCart}
        id="floating-cart-btn"
        initial={{ scale: 0, y: 80 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0, y: 80 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <span className="floating-cart__icon">🛒</span>
        <span className="floating-cart__info">
          <span className="floating-cart__count">{totalItems} item{totalItems > 1 ? 's' : ''}</span>
          <span className="floating-cart__total">₹{grandTotal}</span>
        </span>
        <span className="floating-cart__arrow">→</span>
        <motion.span
          className="floating-cart__badge"
          key={totalItems}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
        >
          {totalItems}
        </motion.span>
      </motion.button>
    </AnimatePresence>
  );
}
