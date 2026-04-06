'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function FloatingCartButton() {
  const { totalItems, openCart, openCheckout, grandTotal } = useCart();

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="floating-cart-wrap"
        initial={{ scale: 0, y: 80 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0, y: 80 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.button
          className="floating-cart"
          onClick={openCart}
          id="floating-cart-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
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
        <motion.button
          className="floating-checkout-btn"
          onClick={openCheckout}
          id="floating-checkout-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Checkout →
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
