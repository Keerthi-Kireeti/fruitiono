'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { DELIVERY_FEE } from '@/data/menuData';

export default function CheckoutModal() {
  const {
    items,
    orderType,
    setOrderType,
    isCheckoutOpen,
    closeCheckout,
    subtotal,
    deliveryCharge,
    grandTotal,
  } = useCart();

  const router = useRouter();
  const [step, setStep] = useState<'type' | 'payment'>('type');

  const handleSelectType = (type: 'preorder' | 'footstep') => {
    setOrderType(type);
    setStep('payment');
  };

  const handlePayNow = () => {
    const orderData = {
      items: items.map(i => ({
        name: i.product.name,
        qty: i.quantity,
        price: i.product.price,
        total: i.product.price * i.quantity,
      })),
      orderType,
      subtotal,
      deliveryCharge,
      grandTotal,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('fruitino_order', JSON.stringify(orderData));
    closeCheckout();
    setStep('type');
    router.push('/order-confirmed');
  };

  const handleBack = () => {
    setStep('type');
    setOrderType(null);
  };

  const handleClose = () => {
    setStep('type');
    closeCheckout();
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          className="checkout-fullscreen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          id="checkout-modal"
        >
          {/* ── Left Panel: Order Summary ─────────────── */}
          <motion.div
            className="checkout-panel checkout-panel--left"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Brand */}
            <div className="checkout-brand">
              <span className="checkout-brand__logo">🍉</span>
              <span className="checkout-brand__name">Fruitino</span>
            </div>

            <h2 className="checkout-panel__title">Your Order</h2>

            {/* Items list */}
            <ul className="checkout-items-list">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="checkout-item-row">
                  <div className="checkout-item-row__left">
                    <span className="checkout-item-row__qty-badge">{quantity}</span>
                    <span className="checkout-item-row__name">{product.name}</span>
                  </div>
                  <span className="checkout-item-row__price">₹{product.price * quantity}</span>
                </li>
              ))}
            </ul>

            <div className="checkout-totals">
              <div className="checkout-totals__row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {orderType === 'footstep' && (
                <div className="checkout-totals__row checkout-totals__row--fee">
                  <span>🚶 Footstep Delivery</span>
                  <span>+₹{deliveryCharge}</span>
                </div>
              )}
              {orderType === 'preorder' && (
                <div className="checkout-totals__row checkout-totals__row--free">
                  <span>🏪 Stall Collection</span>
                  <span>Free</span>
                </div>
              )}
              <div className="checkout-totals__divider" />
              <div className="checkout-totals__row checkout-totals__row--grand">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            {/* Step pills */}
            <div className="checkout-steps-indicator">
              <div className={`checkout-step-pill ${step === 'type' ? 'checkout-step-pill--active' : 'checkout-step-pill--done'}`}>
                <span className="checkout-step-pill__num">{step === 'payment' ? '✓' : '1'}</span>
                <span>Delivery Type</span>
              </div>
              <div className="checkout-step-pill__line" />
              <div className={`checkout-step-pill ${step === 'payment' ? 'checkout-step-pill--active' : ''}`}>
                <span className="checkout-step-pill__num">2</span>
                <span>Payment</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right Panel: Steps ────────────────────── */}
          <motion.div
            className="checkout-panel checkout-panel--right"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 60, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              className="checkout-fullscreen__close"
              onClick={handleClose}
              aria-label="Close checkout"
            >
              ✕ Close
            </button>

            <AnimatePresence mode="wait">
              {/* ── Step 1: Delivery Type ──────────────── */}
              {step === 'type' && (
                <motion.div
                  key="type"
                  className="checkout-right-step"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="checkout-right-step__header">
                    <h2 className="checkout-right-step__title">How would you like your order?</h2>
                    <p className="checkout-right-step__sub">Choose your preferred delivery method</p>
                  </div>

                  <div className="checkout-delivery-grid">
                    {/* Pre-order */}
                    <motion.button
                      className="checkout-delivery-card"
                      onClick={() => handleSelectType('preorder')}
                      whileHover={{ y: -6, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      id="option-preorder"
                    >
                      <div className="checkout-delivery-card__icon-wrap checkout-delivery-card__icon-wrap--stall">
                        <span className="checkout-delivery-card__icon">🏪</span>
                      </div>
                      <h3 className="checkout-delivery-card__title">Pre-Order</h3>
                      <p className="checkout-delivery-card__desc">
                        We&apos;ll prepare your order fresh. Walk up to the stall and collect it when it&apos;s ready!
                      </p>
                      <div className="checkout-delivery-card__badge checkout-delivery-card__badge--free">
                        ✦ No extra charge
                      </div>
                    </motion.button>

                    {/* Footstep Delivery */}
                    <motion.button
                      className="checkout-delivery-card checkout-delivery-card--delivery"
                      onClick={() => handleSelectType('footstep')}
                      whileHover={{ y: -6, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      id="option-footstep"
                    >
                      <div className="checkout-delivery-card__icon-wrap checkout-delivery-card__icon-wrap--walk">
                        <span className="checkout-delivery-card__icon">🚶</span>
                      </div>
                      <h3 className="checkout-delivery-card__title">Footstep Delivery</h3>
                      <p className="checkout-delivery-card__desc">
                        Sit back and relax! We&apos;ll walk your order right to your doorstep.
                      </p>
                      <div className="checkout-delivery-card__badge checkout-delivery-card__badge--fee">
                        + ₹{DELIVERY_FEE} delivery fee
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 2: Payment ────────────────────── */}
              {step === 'payment' && (
                <motion.div
                  key="payment"
                  className="checkout-right-step"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="checkout-right-step__header">
                    <h2 className="checkout-right-step__title">Confirm & Pay</h2>
                    <p className="checkout-right-step__sub">
                      {orderType === 'footstep'
                        ? '🚶 Footstep Delivery selected — ₹20 added'
                        : '🏪 Pre-Order selected — Collect from stall'}
                    </p>
                  </div>

                  {/* Grand total hero */}
                  <div className="checkout-amount-hero">
                    <span className="checkout-amount-hero__label">Amount to pay</span>
                    <span className="checkout-amount-hero__value">₹{grandTotal}</span>
                    {orderType === 'footstep' && (
                      <span className="checkout-amount-hero__breakdown">
                        ₹{subtotal} items + ₹{deliveryCharge} delivery
                      </span>
                    )}
                  </div>

                  {/* Payment info box */}
                  <div className="checkout-payment-info">
                    <div className="checkout-payment-info__step">
                      <span className="checkout-payment-info__num">1</span>
                      <span>Click &quot;Pay Now&quot; — a Google Form will open in a new tab</span>
                    </div>
                    <div className="checkout-payment-info__step">
                      <span className="checkout-payment-info__num">2</span>
                      <span>Scan our QR code in the form and pay ₹{grandTotal}</span>
                    </div>
                    <div className="checkout-payment-info__step">
                      <span className="checkout-payment-info__num">3</span>
                      <span>Enter your name & phone number and submit the form</span>
                    </div>
                  </div>

                  <motion.button
                    className="checkout-pay-now-btn"
                    onClick={handlePayNow}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    id="pay-now-btn"
                  >
                    <span>Pay ₹{grandTotal}</span>
                    <span className="checkout-pay-now-btn__arrow">→</span>
                  </motion.button>

                  <button className="checkout-back-link" onClick={handleBack}>
                    ← Change delivery type
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
