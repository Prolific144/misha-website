// src/config/products.ts
import type { Product, Category } from '@/config/types';
import { getProductImage } from '@/config/imageMappings';

export const PRODUCT_CATEGORIES: Record<Category, string> = {
  kimchi: "Kimchi & Pickled Foods",
  ramen: "Ramen & Instant Noodles",
  sauces: "Sauces, Pastes & Seasonings",
  snacks: "Korean Snacks & Cookies",
  beverages: "Beverages & Alcohol",
  essentials: "Cooking Essentials",
  seafood: "Dried Seafood & Products",
  grains: "Rice, Grains & Noodles",
  frozen: "Frozen Foods & Dumplings",
  health: "Health & Wellness",
  desserts: "Desserts & Sweets",
  specialty: "Specialty & Gourmet"
} as const;

// Define products without images initially
const PRODUCT_DATA: Omit<Product, 'image' | 'imageSource'>[] = [
  // KIMCHI SECTION
  {
    id: 'kimchi-001',
    name: "Cabbage Kimchi - Aged Kimchi",
    price: "KES 500.00",
    size: "300g",
    category: "kimchi",
    featured: true,
    description: "Traditional aged cabbage kimchi with authentic flavor. Perfect for kimchi jjigae or as a side dish."
  },
  {
    id: 'kimchi-002',
    name: "Young Radish Kimchi (Altari Kimchi)",
    price: "KES 500 / KES 1,000",
    size: "500g / 1kg",
    category: "kimchi",
    featured: true,
    description: "Crisp young radish kimchi with spicy seasoning. Great for summer meals."
  },
  {
    id: 'kimchi-003',
    name: "Cabbage Kimchi - Small",
    price: "KES 250.00",
    size: "100g",
    category: "kimchi",
    description: "Small portion of traditional cabbage kimchi. Perfect for trying or single servings."
  },
  {
    id: 'kimchi-004',
    name: "White Kimchi (Baek Kimchi)",
    price: "KES 600.00",
    size: "300g",
    category: "kimchi",
    featured: true,
    description: "Non-spicy white kimchi perfect for all ages. Mild and refreshing."
  },
  {
    id: 'kimchi-005',
    name: "Cucumber Kimchi (Oi Kimchi)",
    price: "KES 450.00",
    size: "250g",
    category: "kimchi",
    description: "Refreshing cucumber kimchi with crunchy texture. Quick pickle style."
  },
  {
    id: 'kimchi-006',
    name: "Water Kimchi (Mul Kimchi)",
    price: "KES 550.00",
    size: "500ml",
    category: "kimchi",
    description: "Light and refreshing water-based kimchi. Perfect for hot days."
  },
  {
    id: 'kimchi-007',
    name: "Spring Onion Kimchi",
    price: "KES 500.00",
    size: "300g",
    category: "kimchi",
    description: "Spring onion kimchi with bold flavors. Great for pancakes."
  },
  {
    id: 'kimchi-008',
    name: "Gat Kimchi (Mustard Leaf Kimchi)",
    price: "KES 650.00",
    size: "300g",
    category: "kimchi",
    featured: true,
    description: "Special mustard leaf kimchi with unique peppery flavor."
  },
  {
    id: 'kimchi-009',
    name: "Bossam Kimchi (Wrapped Kimchi)",
    price: "KES 750.00",
    size: "400g",
    category: "kimchi",
    description: "Whole cabbage leaves wrapped kimchi. Traditional style."
  },
  {
    id: 'kimchi-010',
    name: "Nabak Kimchi (Water Kimchi with Veggies)",
    price: "KES 600.00",
    size: "500ml",
    category: "kimchi",
    description: "Water kimchi with various vegetables. Mild and nutritious."
  },

  // RAMEN & NOODLES SECTION
  {
    id: 'ramen-001',
    name: "Shin Ramyun Noodle Soup",
    price: "KES 350.00",
    size: "120g",
    category: "ramen",
    featured: true,
    description: "Spicy instant noodle soup, Korean favorite. Contains 5 packs per box."
  },
  {
    id: 'ramen-002',
    name: "Jin Ramyun (Mild)",
    price: "KES 320.00",
    size: "120g",
    category: "ramen",
    description: "Mild flavored instant ramen. Perfect for those who prefer less spice."
  },
  {
    id: 'ramen-003',
    name: "Samyang Buldak Hot Chicken Flavor Ramen",
    price: "KES 400.00",
    size: "140g",
    category: "ramen",
    featured: true,
    description: "Extremely spicy chicken flavored ramen. Challenge accepted!"
  },
  {
    id: 'ramen-004',
    name: "Nongshim Neoguri Spicy Seafood Udon",
    price: "KES 380.00",
    size: "120g",
    category: "ramen",
    description: "Spicy seafood flavored udon noodles with thick noodles."
  },
  {
    id: 'ramen-005',
    name: "Paldo Bibim Men (Spicy Cold Noodles)",
    price: "KES 450.00",
    size: "150g",
    category: "ramen",
    description: "Spicy cold noodle mix. Perfect for summer."
  },
  {
    id: 'ramen-006',
    name: "Ottogi Jin Ramen",
    price: "KES 300.00",
    size: "120g",
    category: "ramen",
    description: "Classic instant ramen with mild flavor."
  },
  {
    id: 'ramen-007',
    name: "Samyang Cheese Buldak Ramen",
    price: "KES 420.00",
    size: "140g",
    category: "ramen",
    description: "Spicy cheese chicken flavored ramen. Creamy and spicy."
  },
  {
    id: 'ramen-008',
    name: "Nongshim Chapagetti (Jjapagetti)",
    price: "KES 380.00",
    size: "140g",
    category: "ramen",
    description: "Black bean sauce noodles. Korean-Chinese fusion."
  },
  {
    id: 'ramen-009',
    name: "Samyang Buldak Mild Ramen",
    price: "KES 390.00",
    size: "140g",
    category: "ramen",
    description: "Milder version of the famous Buldak ramen. Still spicy but manageable."
  },

  // SAUCES & PASTES SECTION
  {
    id: 'sauce-001',
    name: "Gochujang (Red Chili Paste) - Sempio",
    price: "KES 850.00",
    size: "500g",
    category: "sauces",
    featured: true,
    description: "Authentic Korean red chili paste. Fermented for rich flavor."
  },
  {
    id: 'sauce-002',
    name: "Doenjang (Soybean Paste) - Sempio",
    price: "KES 800.00",
    size: "500g",
    category: "sauces",
    featured: true,
    description: "Traditional fermented soybean paste. Base for many Korean soups."
  },
  {
    id: 'sauce-003',
    name: "Ssamjang (Dipping Sauce) - CJ",
    price: "KES 750.00",
    size: "500g",
    category: "sauces",
    description: "Dipping sauce for BBQ and vegetables. Ready to use."
  },
  {
    id: 'sauce-004',
    name: "Korean Soy Sauce - Jin Ganjang",
    price: "KES 650.00",
    size: "500ml",
    category: "sauces",
    description: "Traditional Korean soy sauce. Less salty than Chinese soy sauce."
  },
  {
    id: 'sauce-005',
    name: "Sesame Oil - Ottogi",
    price: "KES 1,200.00",
    size: "500ml",
    category: "sauces",
    featured: true,
    description: "Pure roasted sesame oil. Fragrant and flavorful."
  },
  {
    id: 'sauce-006',
    name: "Gochugaru (Korean Red Chili Powder)",
    price: "KES 900.00",
    size: "500g",
    category: "sauces",
    description: "Korean red chili flakes. Coarse grind for authentic texture."
  },
  {
    id: 'sauce-007',
    name: "Bibimbap Sauce",
    price: "KES 550.00",
    size: "300g",
    category: "sauces",
    description: "Ready-to-use bibimbap sauce. Sweet, spicy, and savory."
  },
  {
    id: 'sauce-008',
    name: "Korean BBQ Marinade - Bulgogi",
    price: "KES 700.00",
    size: "500g",
    category: "sauces",
    description: "Pre-made bulgogi marinade. Save time on marinating."
  },
  {
    id: 'sauce-009',
    name: "Yakult Gochujang (Sweet & Spicy)",
    price: "KES 600.00",
    size: "300g",
    category: "sauces",
    description: "Sweet and spicy gochujang variant. Less fermented taste."
  },
  {
    id: 'sauce-010',
    name: "Perilla Oil",
    price: "KES 1,500.00",
    size: "500ml",
    category: "sauces",
    description: "Authentic perilla seed oil. Nutty flavor."
  },

  // SNACKS SECTION
  {
    id: 'snack-001',
    name: "Choco Pie - Orion",
    price: "KES 1,200.00",
    size: "12 pieces",
    category: "snacks",
    featured: true,
    description: "Classic Korean chocolate pie. Soft cake with marshmallow filling."
  },
  {
    id: 'snack-002',
    name: "Honey Butter Chips",
    price: "KES 450.00",
    size: "80g",
    category: "snacks",
    featured: true,
    description: "Sweet honey butter potato chips. Korean snack sensation."
  },
  {
    id: 'snack-003',
    name: "Shrimp Crackers - Nongshim",
    price: "KES 380.00",
    size: "90g",
    category: "snacks",
    description: "Crispy shrimp flavored crackers. Light and addictive."
  },
  {
    id: 'snack-004',
    name: "Pepero Chocolate Sticks",
    price: "KES 400.00",
    size: "40 sticks",
    category: "snacks",
    description: "Chocolate coated biscuit sticks. Various flavors available."
  },
  {
    id: 'snack-005',
    name: "Cheetos Korean Style",
    price: "KES 350.00",
    size: "85g",
    category: "snacks",
    description: "Korean style cheesy snacks with unique flavors."
  },

  // BEVERAGES SECTION
  {
    id: 'beverage-001',
    name: "Makkoli (Korean Rice Wine)",
    price: "KES 1,200.00",
    size: "750ml",
    category: "beverages",
    featured: true,
    description: "Traditional Korean rice wine. Milky and slightly sweet."
  },
  {
    id: 'beverage-002',
    name: "Soju - Chamisul",
    price: "KES 950.00",
    size: "360ml",
    category: "beverages",
    description: "Korean distilled liquor. Clean and smooth."
  },
  {
    id: 'beverage-003',
    name: "Korean Beer - Cass",
    price: "KES 350.00",
    size: "500ml",
    category: "beverages",
    description: "Popular Korean lager beer. Crisp and refreshing."
  },

  // ESSENTIALS SECTION
  {
    id: 'essential-001',
    name: "Korean Rice Cake (Tteok) - Sliced",
    price: "KES 850.00",
    size: "1kg",
    category: "essentials",
    featured: true,
    description: "Sliced rice cakes for tteokbokki. Chewy texture."
  },
  {
    id: 'essential-002',
    name: "Glass Noodles (Dangmyeon)",
    price: "KES 550.00",
    size: "200g",
    category: "essentials",
    description: "Sweet potato starch noodles. For japchae."
  },
  {
    id: 'essential-003',
    name: "Korean Pancake Mix",
    price: "KES 450.00",
    size: "500g",
    category: "essentials",
    description: "Ready mix for Korean savory pancakes. Just add water and vegetables."
  },

  // SEAFOOD SECTION
  {
    id: 'seafood-001',
    name: "Dried Anchovies (Myeolchi)",
    price: "KES 750.00",
    size: "200g",
    category: "seafood",
    featured: true,
    description: "Small dried anchovies for stock. Base for many soups."
  },
  {
    id: 'seafood-002',
    name: "Dried Seaweed (Gim)",
    price: "KES 650.00",
    size: "10 sheets",
    category: "seafood",
    description: "Roasted seaweed sheets. For kimbap or snacks."
  },
  {
    id: 'seafood-003',
    name: "Dried Squid",
    price: "KES 1,200.00",
    size: "150g",
    category: "seafood",
    description: "Dried shredded squid. Popular snack with drinks."
  },

  // GRAINS SECTION
  {
    id: 'grain-001',
    name: "Korean Short Grain Rice",
    price: "KES 1,800.00",
    size: "5kg",
    category: "grains",
    featured: true,
    description: "Premium Korean short grain rice. Sticky and sweet."
  },
  {
    id: 'grain-002',
    name: "Mixed Grains (Japgok)",
    price: "KES 1,200.00",
    size: "2kg",
    category: "grains",
    description: "Healthy mix of various grains for nutritious rice."
  },
  {
    id: 'grain-003',
    name: "Sweet Potato Starch Noodles",
    price: "KES 600.00",
    size: "500g",
    category: "grains",
    description: "Thick noodles for japchae and stir-fries."
  },

  // FROZEN SECTION
  {
    id: 'frozen-001',
    name: "Mandu (Korean Dumplings) - Pork",
    price: "KES 1,200.00",
    size: "20 pieces",
    category: "frozen",
    featured: true,
    description: "Frozen pork dumplings. Pan-fry, steam, or boil."
  },
  {
    id: 'frozen-002',
    name: "Frozen Tteokbokki Set",
    price: "KES 1,500.00",
    size: "1kg set",
    category: "frozen",
    description: "Complete tteokbokki kit with rice cakes and sauce."
  },
  {
    id: 'frozen-003',
    name: "Korean Pancakes (Pajeon) - Seafood",
    price: "KES 1,800.00",
    size: "4 pieces",
    category: "frozen",
    description: "Pre-made seafood pancakes. Just pan-fry and serve."
  },

  // HEALTH SECTION
  {
    id: 'health-001',
    name: "Korean Red Ginseng Extract",
    price: "KES 3,500.00",
    size: "30 packs",
    category: "health",
    featured: true,
    description: "Premium red ginseng extract packs. Energy boost."
  },
  {
    id: 'health-002',
    name: "Barley Tea (Boricha)",
    price: "KES 450.00",
    size: "20 tea bags",
    category: "health",
    description: "Roasted barley tea. Caffeine-free and refreshing."
  },
  {
    id: 'health-003',
    name: "Omija Tea",
    price: "KES 650.00",
    size: "100g",
    category: "health",
    description: "Five-flavor berry tea. Naturally sweet and tart."
  },

  // DESSERTS SECTION
  {
    id: 'dessert-001',
    name: "Korean Rice Cake (Songpyeon)",
    price: "KES 1,500.00",
    size: "12 pieces",
    category: "desserts",
    featured: true,
    description: "Traditional rice cakes for holidays. Various fillings."
  },
  {
    id: 'dessert-002',
    name: "Hotteok Mix",
    price: "KES 750.00",
    size: "500g",
    category: "desserts",
    description: "Mix for Korean sweet pancakes. Fill with brown sugar and nuts."
  },
  {
    id: 'dessert-003',
    name: "Patbingsoo Kit",
    price: "KES 2,500.00",
    size: "Family Set",
    category: "desserts",
    description: "Korean shaved ice dessert kit. Complete with toppings."
  },

  // SPECIALTY SECTION
  {
    id: 'specialty-001',
    name: "Korean Royal Cuisine Kit",
    price: "KES 8,500.00",
    size: "Complete Set",
    category: "specialty",
    featured: true,
    description: "Complete Korean royal meal kit. Special occasion."
  },
  {
    id: 'specialty-002',
    name: "Korean BBQ Set - Premium",
    price: "KES 6,500.00",
    size: "4-6 person set",
    category: "specialty",
    description: "Complete BBQ set with marinated meats, sides, and sauces."
  },
  {
    id: 'specialty-003',
    name: "Traditional Tea Ceremony Set",
    price: "KES 4,500.00",
    size: "Ceremony Set",
    category: "specialty",
    description: "Complete Korean tea ceremony set with utensils and teas."
  }
];

// Transform products to include images
export const PRODUCTS: Product[] = PRODUCT_DATA.map(product => {
  const image = getProductImage(product.id, product.category);
  const isLocalImage = image.includes('/assets/');
  const isUnsplash = image.includes('unsplash.com');

  return {
    ...product,
    image,
    imageSource: isLocalImage ? 'local' : isUnsplash ? 'unsplash' : 'placeholder'
  };
});

// Helper functions
export const getProductsByCategory = (category: Category | string): Product[] => {
  return PRODUCTS.filter(product => product.category === category);
};

export const getFeaturedProducts = (limit?: number): Product[] => {
  const featured = PRODUCTS.filter(product => product.featured);
  return limit ? featured.slice(0, limit) : featured;
};

export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.description?.toLowerCase().includes(searchTerm) ||
    product.id.toLowerCase().includes(searchTerm)
  );
};

export const getProductsByIds = (ids: string[]): Product[] => {
  return ids
    .map(id => getProductById(id))
    .filter((product): product is Product => product !== undefined);
};

export const getCategories = (): Category[] => {
  return Object.keys(PRODUCT_CATEGORIES) as Category[];
};

export const getProductStats = () => {
  const stats: Record<Category, number> = {} as Record<Category, number>;

  PRODUCTS.forEach(product => {
    const category = product.category as Category;
    stats[category] = (stats[category] || 0) + 1;
  });

  return {
    totalProducts: PRODUCTS.length,
    byCategory: stats,
    featuredCount: PRODUCTS.filter(p => p.featured).length
  };
};