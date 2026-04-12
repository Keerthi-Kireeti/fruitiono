/* ═══════════════════════════════════════════════
   Product Menu Data
   Three categories: Kulfi Flavors, Fruit Bowls & Standlones
   ═══════════════════════════════════════════════ */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in ₹
  image: string;
  category: 'kulfi-flavors' | 'fruit-bowls' | 'standlones';
  badge?: string; // e.g. "Bestseller", "New"
}

export const KULFI_FLAVORS: Product[] = [
  {
    id: 'kulfi-malai',
    name: 'Malai Kulfi',
    description: 'Rich & creamy traditional malai kulfi with a velvety smooth texture',
    price: 30,
    image: '/menu/malai-kulfi.png',
    category: 'kulfi-flavors',
    badge: 'Signature',
  },
  {
    id: 'kulfi-rabadi',
    name: 'Rabadi Kulfi',
    description: 'Authentic rabadi-style kulfi with slow-simmered thickened milk & cardamom',
    price: 40,
    image: '/menu/rabadi-kulfi.png',
    category: 'kulfi-flavors',
    badge: 'Bestseller',
  },
  {
    id: 'kulfi-dry-fruit',
    name: 'Dry Fruit Kulfi',
    description: 'Premium kulfi loaded with almonds, pistachios, cashews & saffron strands',
    price: 50,
    image: '/menu/dry-fruit-kulfi.png',
    category: 'kulfi-flavors',
    badge: 'Premium',
  },
];

export const FRUIT_BOWLS: Product[] = [
  {
    id: 'fruit-bowl-standard',
    name: 'Mixed Fruit Bowl (Standard)',
    description: 'A generous bowl of fresh seasonal mixed fruits, hand-cut & served chilled',
    price: 50,
    image: '/menu/mixed-fruit-bowl.png',
    category: 'fruit-bowls',
  },
  {
    id: 'fruit-bowl-vanilla-kulfi',
    name: 'With Vanilla Kulfi Cream',
    description: 'Mixed fruit bowl topped with a luscious swirl of vanilla kulfi cream',
    price: 60,
    image: '/menu/vanilla-kulfi-cream.png',
    category: 'fruit-bowls',
    badge: 'Popular',
  },
  {
    id: 'fruit-bowl-orange-kulfi',
    name: 'With Orange Kulfi Cream',
    description: 'Mixed fruit bowl drizzled with tangy-sweet orange kulfi cream',
    price: 60,
    image: '/menu/orange-kulfi-cream.png',
    category: 'fruit-bowls',
  },
  {
    id: 'fruit-bowl-vanilla-raspberry',
    name: 'With Vanilla Raspberry Kulfi Cream',
    description: 'Mixed fruit bowl with a blend of vanilla & raspberry kulfi cream',
    price: 70,
    image: '/menu/vanilla-raspberry-kulfi.png',
    category: 'fruit-bowls',
    badge: 'New',
  },
  {
    id: 'fruit-bowl-mango-kulfi',
    name: 'With Mango Kulfi Cream',
    description: 'Mixed fruit bowl crowned with rich Alphonso mango kulfi cream',
    price: 60,
    image: '/menu/mango-kulfi-cream.png',
    category: 'fruit-bowls',
    badge: 'Bestseller',
  },
  {
    id: 'fruit-bowl-3-in-1',
    name: 'With Bulk 3 in One Kulfi Cream',
    description: 'Mixed fruit bowl with a trio of kulfi cream flavors — triple the indulgence',
    price: 70,
    image: '/menu/bulk-3in1-kulfi.png',
    category: 'fruit-bowls',
    badge: 'Premium',
  },
];

export const STANDLONE_FRUITS: Product[] = [
  {
    id: 'standlone-mango',
    name: 'Mango Slice',
    description: 'Sweet Alphonso mango slices, freshly cut & served chilled',
    price: 15,
    image: '/menu/mango-slice.png',
    category: 'standlones',
    badge: 'Bestseller',
  },
  {
    id: 'standlone-watermelon',
    name: 'Watermelon Slice',
    description: 'Juicy watermelon slices, refreshingly cool & naturally sweet',
    price: 20,
    image: '/menu/watermelon-slice.png',
    category: 'standlones',
  },
  {
    id: 'standlone-muskmelon',
    name: 'Muskmelon',
    description: 'Aromatic muskmelon slices with a delicate sweetness',
    price: 20,
    image: '/menu/muskmelon.png',
    category: 'standlones',
  },
  {
    id: 'standlone-banana',
    name: 'Banana',
    description: 'Ripe banana slices, naturally creamy & energy-boosting',
    price: 10,
    image: '/menu/banana-slices.png',
    category: 'standlones',
  },
];

export const ALL_PRODUCTS: Product[] = [...KULFI_FLAVORS, ...FRUIT_BOWLS, ...STANDLONE_FRUITS];

export const DELIVERY_FEE = 20; // ₹20 for footstep delivery

// Replace with your actual Google Form URL
export const GOOGLE_FORM_URL = 'https://forms.gle/hKNRXijb3ZmCaNPy6';
