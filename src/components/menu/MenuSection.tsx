'use client';

import { motion } from 'framer-motion';
import { KULFI_FLAVORS, FRUIT_BOWLS, STANDLONE_FRUITS } from '@/data/menuData';
import ProductCard from './ProductCard';

export default function MenuSection() {
  return (
    <section className="menu" id="menu">
      {/* ── Kulfi Flavors Section ────────────────── */}
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
            Kulfi <span className="menu__title-accent menu__title-accent--kulfino">Flavors</span>
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
          {KULFI_FLAVORS.map((product, i) => (
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

      {/* ── Fruit Bowls Section ──────────────────── */}
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
            <span className="menu__category-tag menu__category-tag--frutino">Fresh & Fruity</span>
          </motion.div>
          <motion.h2
            className="menu__category-title menu__category-title--frutino"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Fruit <span className="menu__title-accent menu__title-accent--frutino">Bowls</span>
          </motion.h2>
          <motion.p
            className="menu__category-subtitle"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Fresh mixed fruit bowls with your choice of kulfi cream topping
          </motion.p>
        </div>

        <div className="menu__grid">
          {FRUIT_BOWLS.map((product, i) => (
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

      {/* ── Standlones Section ───────────────────── */}
      <div className="menu__category menu__category--frutino">
        <div className="menu__category-header">
          <motion.div
            className="menu__category-label"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="menu__category-icon">🥭</span>
            <span className="menu__category-tag menu__category-tag--frutino">Single Fruits</span>
          </motion.div>
          <motion.h2
            className="menu__category-title menu__category-title--frutino"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Stand<span className="menu__title-accent menu__title-accent--frutino">lones</span>
          </motion.h2>
          <motion.p
            className="menu__category-subtitle"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Pure, no-frills, single fruit servings — freshly cut & chilled
          </motion.p>
        </div>

        <div className="menu__grid">
          {STANDLONE_FRUITS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
