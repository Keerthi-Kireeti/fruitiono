'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    totalItems,
    openCheckout,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            id="cart-drawer"
          >
            {/* Header */}
            <div className="cart-drawer__header">
              <div className="cart-drawer__title-row">
                <h2 className="cart-drawer__title">
                  🛒 Your Cart
                  <span className="cart-drawer__count">{totalItems}</span>
                </h2>
                <button
                  className="cart-drawer__close"
                  onClick={closeCart}
                  aria-label="Close cart"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="cart-drawer__body">
              {items.length === 0 ? (
                <div className="cart-drawer__empty">
                  <span className="cart-drawer__empty-icon">🍽️</span>
                  <p>Your cart is empty</p>
                  <p className="cart-drawer__empty-sub">Add some delicious treats!</p>
                </div>
              ) : (
                <ul className="cart-drawer__list">
                  {items.map(({ product, quantity }) => (
                    <motion.li
                      key={product.id}
                      className="cart-item"
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                    >
                      <div className="cart-item__image-wrap">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={56}
                          height={56}
                          className="cart-item__image"
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="cart-item__details">
                        <span className="cart-item__name">{product.name}</span>
                        <span className="cart-item__price">₹{product.price} each</span>
                      </div>
                      <div className="cart-item__actions">
                        <div className="cart-item__qty">
                          <button
                            className="cart-item__qty-btn"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                          >
                            −
                          </button>
                          <span className="cart-item__qty-val">{quantity}</span>
                          <button
                            className="cart-item__qty-btn"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <span className="cart-item__subtotal">₹{product.price * quantity}</span>
                        <button
                          className="cart-item__remove"
                          onClick={() => removeItem(product.id)}
                          aria-label={`Remove ${product.name}`}
                        >
                          🗑️
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="cart-drawer__footer">
                <div className="cart-drawer__subtotal-row">
                  <span>Subtotal</span>
                  <span className="cart-drawer__subtotal-val">₹{subtotal}</span>
                </div>
                <div className="cart-drawer__actions">
                  <button
                    className="cart-drawer__clear-btn"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                  <motion.button
                    className="cart-drawer__checkout-btn"
                    onClick={openCheckout}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    id="checkout-btn"
                  >
                    Proceed to Checkout →
                  </motion.button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
