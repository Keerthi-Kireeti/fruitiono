'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Product } from '@/data/menuData';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find(i => i.product.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Badge */}
      {product.badge && (
        <span className={`product-card__badge product-card__badge--${product.category}`}>
          {product.badge}
        </span>
      )}

      {/* Image */}
      <div className={`product-card__image-wrap product-card__image-wrap--${product.category}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          className="product-card__image"
        />
        <div className="product-card__image-glow" />
      </div>

      {/* Info */}
      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__footer">
          <span className="product-card__price">₹{product.price}</span>

          {quantity === 0 ? (
            <motion.button
              className={`product-card__add-btn product-card__add-btn--${product.category}`}
              onClick={() => addItem(product)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              id={`add-${product.id}`}
            >
              <span>Add</span>
              <span className="product-card__add-icon">+</span>
            </motion.button>
          ) : (
            <div className={`product-card__qty-control product-card__qty-control--${product.category}`}>
              <button
                className="product-card__qty-btn"
                onClick={() => updateQuantity(product.id, quantity - 1)}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="product-card__qty-value">{quantity}</span>
              <button
                className="product-card__qty-btn"
                onClick={() => updateQuantity(product.id, quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
