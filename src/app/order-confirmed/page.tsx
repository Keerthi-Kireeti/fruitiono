'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface OrderData {
  items: { name: string; qty: number; price: number; total: number }[];
  orderType: 'preorder' | 'footstep';
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  timestamp: string;
}

type Step = 'payment' | 'details' | 'confirmed';

/** Compress an image file to a smaller base64 JPEG */
function compressImage(file: File, maxSize: number, quality: number): Promise<string> {
  return new Promise((resolve) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxSize || height > maxSize) {
        const ratio = Math.min(maxSize / width, maxSize / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = url;
  });
}

export default function OrderConfirmedPage() {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [step, setStep] = useState<Step>('payment');

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const { clearCart } = useCart();

  useEffect(() => {
    const data = localStorage.getItem('fruitino_order');
    if (data) {
      setOrder(JSON.parse(data));
      clearCart();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Handle screenshot selection ── */
  const handleScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScreenshotFile(file);
    if (errors.screenshot) setErrors(prev => ({ ...prev, screenshot: '' }));

    const reader = new FileReader();
    reader.onload = () => setScreenshotPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  /* ── Validation ── */
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your name';
    if (!phone.trim()) errs.phone = 'Please enter your phone number';
    else if (!/^\d{10}$/.test(phone.replace(/\s/g, '')))
      errs.phone = 'Enter a valid 10-digit number';

    if (!screenshotFile) errs.screenshot = 'Please upload a payment screenshot';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ── Submit handler ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !order) return;
    setSubmitting(true);

    // Show confirmation immediately — upload in background
    setStep('confirmed');
    setSubmitting(false);

    // Background: compress screenshot + send to Google Sheet
    try {
      let screenshotBase64 = '';
      if (screenshotFile) {
        screenshotBase64 = await compressImage(screenshotFile, 800, 0.6);
      }

      fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name.trim(),
          phone: phone.trim(),
          transactionId: transactionId.trim(),
          screenshot: screenshotBase64,
          items: order.items,
          orderType: order.orderType,
          subtotal: order.subtotal,
          deliveryCharge: order.deliveryCharge,
          grandTotal: order.grandTotal,
          timestamp: order.timestamp,
        }),
      }).catch(() => console.warn('Sheet upload failed silently'));
    } catch {
      console.warn('Sheet submission failed, order flow continues');
    }
  };

  /* ── No order found ── */
  if (!order) {
    return (
      <main className="confirmation">
        <div className="confirmation__container">
          <motion.div
            className="confirmation__card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="confirmation__icon">🤔</span>
            <h1 className="confirmation__title">No Order Found</h1>
            <p className="confirmation__subtitle">
              It looks like you haven&apos;t placed an order yet.
            </p>
            <Link href="/" className="confirmation__back-btn">← Back to Menu</Link>
          </motion.div>
        </div>
      </main>
    );
  }

  const isFootstep = order.orderType === 'footstep';

  return (
    <main className="confirmation">
      <div className="confirmation__container">
        <AnimatePresence mode="wait">

          {/* ═══════════════════════════════════════════
              STEP 1 — Scan QR & Pay
          ═══════════════════════════════════════════ */}
          {step === 'payment' && (
            <motion.div
              key="payment"
              className="confirmation__card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            >
              <motion.h1
                className="confirmation__title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                Scan &amp; Pay
              </motion.h1>

              <motion.p
                className="confirmation__subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                Scan the QR code below with any UPI app to complete your payment
              </motion.p>

              {/* QR Code */}
              <motion.div
                className="confirmation__qr-box"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
              >
                <div className="confirmation__qr-image-wrap">
                  <Image
                    src="/payment-qr.jpg"
                    alt="UPI Payment QR Code"
                    width={240}
                    height={240}
                    className="confirmation__qr-image"
                    priority
                  />
                </div>
                <div className="confirmation__qr-amount-box">
                  <span className="confirmation__qr-label">Amount to Pay</span>
                  <span className="confirmation__qr-amount">₹{order.grandTotal}</span>
                </div>
              </motion.div>

              {/* Order type pill */}
              <motion.div
                className={`confirmation__type-pill confirmation__type-pill--${order.orderType}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <span>{isFootstep ? '🚶' : '🏪'}</span>
                <span>{isFootstep ? 'Footstep Delivery (+₹20)' : 'Pre-Order — Stall Pickup'}</span>
              </motion.div>

              <motion.button
                className="confirmation__form-btn"
                onClick={() => setStep('details')}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                id="ive-paid-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                I&apos;ve Paid — Continue →
              </motion.button>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════
              STEP 2 — Name, Phone, Transaction ID, Screenshot
          ═══════════════════════════════════════════ */}
          {step === 'details' && (
            <motion.div
              key="details"
              className="confirmation__card"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            >
              <motion.h1
                className="confirmation__title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Payment Details
              </motion.h1>

              <motion.p
                className="confirmation__subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 }}
              >
                Enter your details and upload proof of payment
              </motion.p>

              <motion.form
                className="confirmation__form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                noValidate
              >
                {/* Name */}
                <div className="confirmation__field">
                  <label className="confirmation__label" htmlFor="cust-name">Full Name</label>
                  <input
                    id="cust-name"
                    type="text"
                    className={`confirmation__input${errors.name ? ' confirmation__input--error' : ''}`}
                    placeholder="e.g. Ramya Sharma"
                    value={name}
                    onChange={e => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                  />
                  {errors.name && <span className="confirmation__error">{errors.name}</span>}
                </div>

                {/* Phone */}
                <div className="confirmation__field">
                  <label className="confirmation__label" htmlFor="cust-phone">Phone Number</label>
                  <input
                    id="cust-phone"
                    type="tel"
                    className={`confirmation__input${errors.phone ? ' confirmation__input--error' : ''}`}
                    placeholder="10-digit mobile number"
                    value={phone}
                    maxLength={10}
                    onChange={e => {
                      setPhone(e.target.value.replace(/\D/g, ''));
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                  />
                  {errors.phone && <span className="confirmation__error">{errors.phone}</span>}
                </div>

                {/* Transaction ID */}
                <div className="confirmation__field">
                  <label className="confirmation__label" htmlFor="txn-id">UPI Transaction ID <span className="confirmation__label-optional">(Optional)</span></label>
                  <input
                    id="txn-id"
                    type="text"
                    className={`confirmation__input${errors.transactionId ? ' confirmation__input--error' : ''}`}
                    placeholder="e.g. 412345678901"
                    value={transactionId}
                    onChange={e => {
                      setTransactionId(e.target.value);
                      if (errors.transactionId) setErrors(prev => ({ ...prev, transactionId: '' }));
                    }}
                  />
                  {errors.transactionId && <span className="confirmation__error">{errors.transactionId}</span>}
                </div>

                {/* Screenshot upload */}
                <div className="confirmation__field">
                  <label className="confirmation__label">Payment Screenshot</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="confirmation__file-hidden"
                    onChange={handleScreenshot}
                  />

                  {!screenshotPreview ? (
                    <button
                      type="button"
                      className={`confirmation__upload-btn${errors.screenshot ? ' confirmation__upload-btn--error' : ''}`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="confirmation__upload-icon">📸</span>
                      <span>Tap to upload screenshot</span>
                    </button>
                  ) : (
                    <div className="confirmation__preview-wrap">
                      <Image
                        src={screenshotPreview}
                        alt="Payment screenshot"
                        width={200}
                        height={300}
                        className="confirmation__preview-img"
                        style={{ objectFit: 'contain' }}
                      />
                      <button
                        type="button"
                        className="confirmation__preview-change"
                        onClick={() => {
                          setScreenshotFile(null);
                          setScreenshotPreview(null);
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                      >
                        Change screenshot
                      </button>
                    </div>
                  )}
                  {errors.screenshot && <span className="confirmation__error">{errors.screenshot}</span>}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="confirmation__form-btn"
                  id="submit-order-btn"
                  whileHover={submitting ? {} : { scale: 1.02 }}
                  whileTap={submitting ? {} : { scale: 0.97 }}
                  disabled={submitting}
                  style={{ opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting ? '⏳ Submitting…' : 'Confirm My Order →'}
                </motion.button>

                <button
                  type="button"
                  className="confirmation__back-link"
                  onClick={() => setStep('payment')}
                >
                  ← Back to payment
                </button>
              </motion.form>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════════
              STEP 3 — Order Confirmed 🎉
          ═══════════════════════════════════════════ */}
          {step === 'confirmed' && (
            <motion.div
              key="confirmed"
              className="confirmation__card"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Big checkmark */}
              <motion.div
                className="confirmation__checkmark"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
              >
                <span className="confirmation__check-icon">✅</span>
              </motion.div>

              <motion.h1
                className="confirmation__title"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Order Confirmed!
              </motion.h1>

              {/* Order-type acknowledgement */}
              <motion.div
                className={`confirmation__status-card confirmation__status-card--${order.orderType}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
              >
                <span className="confirmation__status-icon">
                  {isFootstep ? '🚶' : '🏪'}
                </span>
                <p className="confirmation__status-message">
                  {isFootstep
                    ? 'Your order is on the way! 🎉'
                    : 'Your order will be ready at the stall — please collect it from there! 🎉'}
                </p>
                <p className="confirmation__status-detail">
                  {isFootstep
                    ? 'Our delivery person is on their way to you. Hang tight!'
                    : 'We\'ll have it freshly prepared and waiting for you at the stall.'}
                </p>
              </motion.div>

              {/* Order summary */}
              <motion.div
                className="confirmation__details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h3 className="confirmation__details-title">Order Summary</h3>
                <ul className="confirmation__items">
                  {order.items.map((item, i) => (
                    <li key={i} className="confirmation__item">
                      <span>{item.name} × {item.qty}</span>
                      <span>₹{item.total}</span>
                    </li>
                  ))}
                </ul>
                <div className="confirmation__divider" />
                {order.deliveryCharge > 0 && (
                  <div className="confirmation__row">
                    <span>Delivery Fee</span>
                    <span>₹{order.deliveryCharge}</span>
                  </div>
                )}
                <div className="confirmation__row confirmation__row--total">
                  <span>Total Paid</span>
                  <span>₹{order.grandTotal}</span>
                </div>
                {name && (
                  <p className="confirmation__customer-note">
                    🙏 Thank you, {name}! Enjoy your treat.
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Link href="/" className="confirmation__back-btn">
                  ← Back to Home
                </Link>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}
