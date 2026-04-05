/* ═══════════════════════════════════════════════
   Product Menu Data
   Two categories: Frutino (fruits) & Kulfino (kulfi)
   ═══════════════════════════════════════════════ */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in ₹
  image: string;
  category: 'frutino' | 'kulfino';
  badge?: string; // e.g. "Bestseller", "New"
}

export const FRUTINO_PRODUCTS: Product[] = [
  {
    id: 'frutino-mango-delight',
    name: 'Mango Delight',
    description: 'Sweet Alphonso mango chunks drizzled with honey & a sprinkle of chaat masala',
    price: 60,
    image: '/hero/mango-slice.png',
    category: 'frutino',
    badge: 'Bestseller',
  },
  {
    id: 'frutino-strawberry-bliss',
    name: 'Strawberry Bliss',
    description: 'Fresh strawberries with condensed milk drizzle & crushed pista',
    price: 70,
    image: '/hero/strawberry.png',
    category: 'frutino',
    badge: 'Popular',
  },
  {
    id: 'frutino-kiwi-fresh',
    name: 'Kiwi Fresh',
    description: 'Tangy kiwi slices with a hint of lime and rock salt',
    price: 65,
    image: '/hero/kiwi-slice.png',
    category: 'frutino',
  },
  {
    id: 'frutino-orange-punch',
    name: 'Orange Punch',
    description: 'Juicy orange segments with a zesty mint garnish',
    price: 55,
    image: '/hero/orange-slice.png',
    category: 'frutino',
  },
  {
    id: 'frutino-grape-sorbet',
    name: 'Grape Sorbet',
    description: 'Frozen grape medley with a splash of rose water',
    price: 60,
    image: '/hero/grapes.png',
    category: 'frutino',
    badge: 'New',
  },
];

export const KULFINO_PRODUCTS: Product[] = [
  {
    id: 'kulfino-kesar-pista',
    name: 'Kesar Pista Kulfi',
    description: 'Rich saffron-infused kulfi loaded with crushed pistachios',
    price: 50,
    image: '/hero/kulfi-stick.png',
    category: 'kulfino',
    badge: 'Signature',
  },
  {
    id: 'kulfino-matka',
    name: 'Matka Kulfi',
    description: 'Traditional clay-pot kulfi slow-set with cardamom & rose',
    price: 60,
    image: '/hero/matka-kulfi.png',
    category: 'kulfino',
    badge: 'Bestseller',
  },
  {
    id: 'kulfino-mango',
    name: 'Mango Kulfi',
    description: 'Creamy Alphonso mango kulfi with real fruit chunks inside',
    price: 55,
    image: '/hero/mango-kulfi.png',
    category: 'kulfino',
    badge: 'Popular',
  },
  {
    id: 'kulfino-rose',
    name: 'Rose Kulfi',
    description: 'Delicate rose-petal kulfi topped with silver varq & nuts',
    price: 55,
    image: '/hero/rose-kulfi.png',
    category: 'kulfino',
  },
  {
    id: 'kulfino-malai',
    name: 'Royal Malai Kulfi',
    description: 'Extra-creamy malai kulfi with almonds & saffron strands',
    price: 45,
    image: '/hero/pistachios.png',
    category: 'kulfino',
    badge: 'New',
  },
];

export const ALL_PRODUCTS: Product[] = [...FRUTINO_PRODUCTS, ...KULFINO_PRODUCTS];

export const DELIVERY_FEE = 20; // ₹20 for footstep delivery

// Replace with your actual Google Form URL
export const GOOGLE_FORM_URL = 'https://forms.gle/hKNRXijb3ZmCaNPy6';
