'use client';

import { motion } from 'framer-motion';
import { FRUTINO_PRODUCTS, KULFINO_PRODUCTS } from '@/data/menuData';
import ProductCard from './ProductCard';

export default function MenuSection() {
  return (
    <section className="menu" id="menu">
      {/* ── Frutino Section ─────────────────────── */}
      <div className="menu__category menu__category--frutino">
        <div className="menu__category-header">
          <motion.div
            className="menu__category-label"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="menu__category-icon">🍉</span>
            <span className="menu__category-tag menu__category-tag--frutino">Fresh Fruits</span>
          </motion.div>
          <motion.h2
            className="menu__category-title menu__category-title--frutino"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Frutino <span className="menu__title-accent menu__title-accent--frutino">Specials</span>
          </motion.h2>
          <motion.p
            className="menu__category-subtitle"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Freshly cut fruits, hand-picked daily, served with love
          </motion.p>
        </div>

        <div className="menu__grid">
          {FRUTINO_PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>

      {/* ── Divider ─────────────────────────────── */}
      <div className="menu__divider">
        <span className="menu__divider-line" />
        <span className="menu__divider-icon">✦</span>
        <span className="menu__divider-line" />
      </div>

      {/* ── Kulfino Section ─────────────────────── */}
      <div className="menu__category menu__category--kulfino">
        <div className="menu__category-header">
          <motion.div
            className="menu__category-label"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="menu__category-icon">🍨</span>
            <span className="menu__category-tag menu__category-tag--kulfino">Handcrafted Kulfi</span>
          </motion.div>
          <motion.h2
            className="menu__category-title menu__category-title--kulfino"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Kulfino <span className="menu__title-accent menu__title-accent--kulfino">Classics</span>
          </motion.h2>
          <motion.p
            className="menu__category-subtitle"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Traditional kulfi, slow-set to perfection with premium ingredients
          </motion.p>
        </div>

        <div className="menu__grid">
          {KULFINO_PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
