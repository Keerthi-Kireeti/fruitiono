import { HeroSection } from '@/components/hero';
import MenuSection from '@/components/menu/MenuSection';
import FloatingCartButton from '@/components/cart/FloatingCartButton';
import CartDrawer from '@/components/cart/CartDrawer';
import CheckoutModal from '@/components/checkout/CheckoutModal';

export default function Home() {
  return (
    <main>
      <HeroSection
        orderHref="#menu"
        menuHref="#menu"
        orderLabel="Order Now"
        menuLabel="Explore Menu"
      />
      <MenuSection />
      <FloatingCartButton />
      <CartDrawer />
      <CheckoutModal />
    </main>
  );
}
