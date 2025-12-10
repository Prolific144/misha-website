import type { Product, Recipe, ContactInfo, WhatsAppConfig, FlashSale, Recommendation } from '../types';

export const COMPANY_CONFIG = {
  name: "Misha Foodstuffs Limited",
  tagline: "Korean Food Mart & Distributor",
  heroSubtitle: "Your go-to supplier for authentic Korean groceries, kimchi, ramen, snacks, sauces & more in Nairobi, Kenya. Free delivery for orders above KES 2,000.",
  
  contact: {
    address: {
      line1: "Samaki Drive Hse Number 13",
      line2: "Nairobi, Kenya"
    },
    phone: "+254 797 005509",
    email: "songhunfoodstuffsltd@gmail.com"
  } as ContactInfo,
  
  whatsapp: {
    number: "+254797005509",
    message: "Hello! I'd like to place an order from Misha Foodstuffs."
  } as WhatsAppConfig,
  
  getWhatsAppUrl(): string {
    const num = this.whatsapp.number.replace(/\D/g, '');
    const msg = encodeURIComponent(this.whatsapp.message);
    return `https://wa.me/${num}?text=${msg}`;
  },
  
  products: [
    // KIMCHI SECTION
    { name: "Cabbage Kimchi - Aged Kimchi", price: "KES 500.00", size: "300g", category: "kimchi", featured: true },
    { name: "Young Radish Kimchi (Altari Kimchi)", price: "KES 500 / KES 1,000", size: "500g / 1kg", category: "kimchi" },
    { name: "Cabbage Kimchi - Small", price: "KES 250.00", size: "100g", category: "kimchi" },
    { name: "White Kimchi (Baek Kimchi)", price: "KES 600.00", size: "300g", category: "kimchi" },
    { name: "Cucumber Kimchi (Oi Kimchi)", price: "KES 450.00", size: "250g", category: "kimchi" },
    { name: "Water Kimchi (Mul Kimchi)", price: "KES 550.00", size: "500ml", category: "kimchi" },
    { name: "Spring Onion Kimchi", price: "KES 500.00", size: "300g", category: "kimchi" },
    { name: "Gat Kimchi (Mustard Leaf Kimchi)", price: "KES 650.00", size: "300g", category: "kimchi", featured: true },
    { name: "Bossam Kimchi (Wrapped Kimchi)", price: "KES 750.00", size: "400g", category: "kimchi" },
    { name: "Nabak Kimchi (Water Kimchi with Veggies)", price: "KES 600.00", size: "500ml", category: "kimchi" },
    { name: "Kimchi Pancake Mix", price: "KES 350.00", size: "200g", category: "kimchi" },

    // RAMEN & NOODLES
    { name: "Shin Ramyun Noodle Soup", price: "KES 350.00", size: "120g", category: "ramen", featured: true },
    { name: "Jin Ramyun (Mild)", price: "KES 320.00", size: "120g", category: "ramen" },
    { name: "Samyang Buldak Hot Chicken Flavor Ramen", price: "KES 400.00", size: "140g", category: "ramen" },
    { name: "Nongshim Neoguri Spicy Seafood Udon", price: "KES 380.00", size: "120g", category: "ramen" },
    { name: "Paldo Bibim Men (Spicy Cold Noodles)", price: "KES 450.00", size: "150g", category: "ramen" },
    { name: "Ottogi Jin Ramen", price: "KES 300.00", size: "120g", category: "ramen" },
    { name: "Samyang Cheese Buldak Ramen", price: "KES 420.00", size: "140g", category: "ramen" },
    { name: "Nongshim Chapagetti (Jjapagetti)", price: "KES 380.00", size: "140g", category: "ramen" },

    // SAUCES & PASTES
    { name: "Gochujang (Red Chili Paste) - Sempio", price: "KES 850.00", size: "500g", category: "sauces", featured: true },
    { name: "Doenjang (Soybean Paste) - Sempio", price: "KES 800.00", size: "500g", category: "sauces" },
    { name: "Ssamjang (Dipping Sauce) - CJ", price: "KES 750.00", size: "500g", category: "sauces" },
    { name: "Korean Soy Sauce - Jin Ganjang", price: "KES 650.00", size: "500ml", category: "sauces" },
    { name: "Sesame Oil - Ottogi", price: "KES 1,200.00", size: "500ml", category: "sauces" },
    { name: "Gochugaru (Korean Red Chili Powder)", price: "KES 900.00", size: "500g", category: "sauces" },
    { name: "Bibimbap Sauce", price: "KES 550.00", size: "300g", category: "sauces" },
    { name: "Korean BBQ Marinade - Bulgogi", price: "KES 700.00", size: "500g", category: "sauces" },
    { name: "Yakult Gochujang (Sweet & Spicy)", price: "KES 600.00", size: "300g", category: "sauces" },
    { name: "Perilla Oil", price: "KES 1,500.00", size: "500ml", category: "sauces" },

    // SNACKS
    { name: "Choco Pie - Orion", price: "KES 1,200.00", size: "12 pieces", category: "snacks", featured: true },
    { name: "Honey Butter Chips", price: "KES 450.00", size: "80g", category: "snacks" },
    { name: "Shrimp Crackers - Nongshim", price: "KES 380.00", size: "90g", category: "snacks" },
    { name: "Korean Rice Crackers (Tteokbokki Snack)", price: "KES 400.00", size: "85g", category: "snacks" },
    { name: "Sweet Potato Sticks", price: "KES 350.00", size: "80g", category: "snacks" },
    { name: "Korean Peanut Butter Sticks", price: "KES 320.00", size: "12 pieces", category: "snacks" },
    { name: "Banana Kick", price: "KES 280.00", size: "42g", category: "snacks" },
    { name: "Market O Real Brownie", price: "KES 550.00", size: "156g", category: "snacks" },
    { name: "Pepero Sticks (Chocolate)", price: "KES 380.00", size: "52g", category: "snacks" },
    { name: "Korean Seaweed Rolls (Gim)", price: "KES 250.00", size: "5g", category: "snacks" },

    // BEVERAGES
    { name: "Makkoli (Korean Rice Wine)", price: "KES 1,200.00", size: "750ml", category: "beverages", featured: true },
    { name: "Soju - Chamisul", price: "KES 900.00", size: "360ml", category: "beverages" },
    { name: "Sikhye (Sweet Rice Drink)", price: "KES 450.00", size: "1L", category: "beverages" },
    { name: "Korean Beer - Cass", price: "KES 350.00", size: "500ml", category: "beverages" },
    { name: "Yakult Probiotic Drink", price: "KES 400.00", size: "5 bottles", category: "beverages" },
    { name: "Korean Green Tea", price: "KES 600.00", size: "100g", category: "beverages" },
    { name: "Barley Tea (Boricha)", price: "KES 550.00", size: "100g", category: "beverages" },
    { name: "Persimmon Punch (Sujeonggwa)", price: "KES 800.00", size: "1L", category: "beverages" },

    // COOKING ESSENTIALS
    { name: "Korean Rice Cake (Tteok) - Sliced", price: "KES 850.00", size: "1kg", category: "essentials" },
    { name: "Glass Noodles (Dangmyeon)", price: "KES 700.00", size: "200g", category: "essentials" },
    { name: "Kimchi Fridge", price: "KES 45,000.00", size: "110L", category: "essentials" },
    { name: "Stone Pot (Dolsot)", price: "KES 3,500.00", size: "Medium", category: "essentials" },
    { name: "Korean BBQ Grill Pan", price: "KES 4,200.00", size: "Family Size", category: "essentials" },
    { name: "Bamboo Mat for Gimbap", price: "KES 800.00", size: "Standard", category: "essentials" },
    { name: "Korean Rice Cooker", price: "KES 8,500.00", size: "5-cup", category: "essentials" },
    { name: "Kimchi Storage Container", price: "KES 2,500.00", size: "5L", category: "essentials" },

    // SEAFOOD
    { name: "Dried Anchovies (Myeolchi)", price: "KES 750.00", size: "200g", category: "seafood" },
    { name: "Dried Seaweed (Miyeok)", price: "KES 600.00", size: "100g", category: "seafood" },
    { name: "Salted Shrimp (Saeujeot)", price: "KES 850.00", size: "200g", category: "seafood" },
    { name: "Dried Pollock (Bugo)", price: "KES 1,200.00", size: "200g", category: "seafood" },

    // RICE & GRAINS
    { name: "Korean Short Grain Rice", price: "KES 1,800.00", size: "5kg", category: "grains" },
    { name: "Black Rice (Heukmi)", price: "KES 2,500.00", size: "2kg", category: "grains" },
    { name: "Sweet Rice (Chapssal)", price: "KES 2,000.00", size: "2kg", category: "grains" },
    { name: "Barley (Bori)", price: "KES 900.00", size: "1kg", category: "grains" },

    // FROZEN FOODS
    { name: "Mandu (Korean Dumplings) - Pork", price: "KES 1,200.00", size: "20 pieces", category: "frozen" },
    { name: "Mandu (Korean Dumplings) - Kimchi", price: "KES 1,150.00", size: "20 pieces", category: "frozen" },
    { name: "Frozen Tteokbokki Rice Cakes", price: "KES 950.00", size: "1kg", category: "frozen" },
    { name: "Korean Pancake Mix (Buchimgae)", price: "KES 650.00", size: "500g", category: "frozen" },

    // HEALTH & WELLNESS
    { name: "Korean Red Ginseng Extract", price: "KES 3,500.00", size: "30 packs", category: "health" },
    { name: "Fermented Soybean (Cheonggukjang)", price: "KES 950.00", size: "500g", category: "health" },
    { name: "Korean Royal Jelly", price: "KES 4,200.00", size: "100g", category: "health" },
    { name: "Seaweed Calcium Supplement", price: "KES 2,800.00", size: "120 tablets", category: "health" },

    // DESSERTS & SWEETS
    { name: "Korean Rice Cake (Songpyeon)", price: "KES 1,500.00", size: "12 pieces", category: "desserts" },
    { name: "Hoddeok (Sweet Pancake Mix)", price: "KES 850.00", size: "500g", category: "desserts" },
    { name: "Yakgwa (Honey Pastry)", price: "KES 1,200.00", size: "10 pieces", category: "desserts" },
    { name: "Bungeoppang (Fish-shaped Pastry)", price: "KES 950.00", size: "6 pieces", category: "desserts" },

    // SPECIALTY ITEMS
    { name: "Korean Royal Cuisine Kit", price: "KES 8,500.00", size: "Complete Set", category: "specialty" },
    { name: "Traditional Kimchi Making Kit", price: "KES 4,500.00", size: "Complete Set", category: "specialty" },
    { name: "Korean BBQ Party Pack", price: "KES 12,000.00", size: "For 6-8 people", category: "specialty" },
    { name: "Bulgogi Family Meal Kit", price: "KES 6,500.00", size: "For 4-5 people", category: "specialty" },
  ] as Product[],
  
  recipes: [
    {
      title: "Kimchi Fried Rice",
      img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "2 cups cooked rice (preferably day-old)",
        "1 cup chopped cabbage kimchi",
        "1 tbsp gochujang (Korean red chili paste)",
        "1 tbsp soy sauce",
        "1 egg",
        "2 green onions, chopped",
        "1 tsp sesame oil",
        "Cooking oil",
        "Sesame seeds for garnish"
      ],
      steps: [
        "Heat oil in a large pan over medium-high heat.",
        "Add kimchi and stir-fry for 2 minutes until fragrant.",
        "Add rice and gochujang, mix well and fry for 3–4 minutes.",
        "Push rice to one side, crack an egg and scramble.",
        "Mix everything together, add soy sauce and sesame oil.",
        "Garnish with green onions and sesame seeds.",
        "Serve hot with extra kimchi on the side."
      ]
    },
    {
      title: "Bibimbap (Mixed Rice Bowl)",
      img: "https://images.unsplash.com/photo-1505253668822-42074d58a7c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "2 cups cooked white rice",
        "200g beef bulgogi (marinated beef)",
        "1 carrot, julienned",
        "1 zucchini, julienned",
        "100g spinach",
        "100g bean sprouts",
        "2 eggs",
        "4 tbsp gochujang sauce",
        "Sesame oil and seeds",
        "Vegetable oil for cooking"
      ],
      steps: [
        "Sauté each vegetable separately in oil until cooked but still crisp.",
        "Cook beef bulgogi in a pan until browned and cooked through.",
        "Fry eggs sunny-side up.",
        "Arrange hot rice in bowls, top with vegetables and beef in sections.",
        "Place fried egg in the center.",
        "Drizzle with sesame oil and sprinkle sesame seeds.",
        "Serve with gochujang sauce on the side."
      ]
    },
    {
      title: "Tteokbokki (Spicy Rice Cakes)",
      img: "https://images.unsplash.com/photo-1599810501777-d5e6bb9b4e10?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "400g tteok (Korean rice cakes)",
        "150g fish cakes, sliced",
        "1/2 cabbage, chopped",
        "2 hard-boiled eggs",
        "3 cups water or anchovy broth",
        "3 tbsp gochujang",
        "1 tbsp gochugaru (red pepper flakes)",
        "1 tbsp soy sauce",
        "1 tbsp sugar",
        "2 green onions, chopped",
        "1 tsp minced garlic"
      ],
      steps: [
        "Soak rice cakes in warm water for 30 minutes if using dried ones.",
        "In a large pan, combine water, gochujang, gochugaru, soy sauce, sugar, and garlic.",
        "Bring to a boil, then add rice cakes, fish cakes, and cabbage.",
        "Cook for 10-15 minutes until sauce thickens and rice cakes are soft.",
        "Add hard-boiled eggs and green onions.",
        "Simmer for 2 more minutes.",
        "Serve hot in bowls."
      ]
    },
    {
      title: "Bulgogi (Korean BBQ Beef)",
      img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "500g beef sirloin or ribeye, thinly sliced",
        "1/2 onion, sliced",
        "2 green onions, chopped",
        "1 carrot, julienned",
        "4 tbsp soy sauce",
        "2 tbsp brown sugar",
        "1 tbsp sesame oil",
        "1 tbsp minced garlic",
        "1 tsp grated ginger",
        "1/2 Asian pear, grated",
        "1 tbsp sesame seeds",
        "Black pepper to taste"
      ],
      steps: [
        "In a bowl, mix soy sauce, sugar, sesame oil, garlic, ginger, and pear.",
        "Add beef and vegetables to the marinade, mix well.",
        "Cover and refrigerate for at least 2 hours (overnight for best flavor).",
        "Heat a grill or pan over high heat.",
        "Cook beef and vegetables in batches until caramelized and cooked through.",
        "Sprinkle with sesame seeds and extra green onions.",
        "Serve with rice and lettuce leaves for wrapping."
      ]
    },
    {
      title: "Japchae (Stir-fried Glass Noodles)",
      img: "https://images.unsplash.com/photo-1606851094291-85ef15154e18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "200g sweet potato starch noodles (dangmyeon)",
        "100g beef, thinly sliced",
        "1 carrot, julienned",
        "1 onion, sliced",
        "1 red bell pepper, julienned",
        "100g spinach",
        "5-6 dried shiitake mushrooms, soaked and sliced",
        "4 tbsp soy sauce",
        "2 tbsp sugar",
        "2 tbsp sesame oil",
        "1 tbsp minced garlic",
        "Sesame seeds for garnish",
        "Vegetable oil for cooking"
      ],
      steps: [
        "Cook noodles according to package directions, drain and rinse.",
        "Cut noodles into shorter lengths, toss with 1 tbsp sesame oil.",
        "Marinate beef in 1 tbsp soy sauce and 1/2 tbsp sugar for 15 minutes.",
        "Stir-fry each vegetable separately in oil until tender.",
        "Stir-fry beef until cooked, then combine all ingredients.",
        "Add remaining soy sauce, sugar, and sesame oil.",
        "Mix well, garnish with sesame seeds.",
        "Serve warm or at room temperature."
      ]
    },
    {
      title: "Sundubu Jjigae (Soft Tofu Stew)",
      img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      ingredients: [
        "350g soft tofu",
        "100g pork or beef, thinly sliced",
        "100g clams or shrimp",
        "1 onion, sliced",
        "1 zucchini, sliced",
        "2 shiitake mushrooms, sliced",
        "1 green chili, sliced",
        "2 tbsp gochugaru (red pepper flakes)",
        "1 tbsp minced garlic",
        "1 tbsp soy sauce",
        "1 tsp sesame oil",
        "2 cups anchovy or kelp broth",
        "1 egg",
        "2 green onions, chopped",
        "Salt to taste"
      ],
      steps: [
        "Heat sesame oil in a stone pot or heavy pot.",
        "Sauté meat until browned, add onion and garlic.",
        "Add gochugaru and stir for 1 minute.",
        "Pour in broth and bring to a boil.",
        "Add zucchini, mushrooms, and seafood.",
        "Carefully add soft tofu in large pieces.",
        "Add soy sauce and green chili.",
        "Crack an egg into the stew.",
        "Simmer for 5-7 minutes until egg is cooked.",
        "Garnish with green onions and serve bubbling hot."
      ]
    }
  ] as Recipe[],

  // Business Info
  businessHours: {
    weekdays: "8:00 AM - 5:00 PM",
    saturday: "9:00 AM - 4:00 PM",
    sunday: "Appointments Only",
    holidays: "Closed on major holidays"
  },

  // Delivery Info
  delivery: {
    freeThreshold: 2000, // KES
    nairobiAreas: [
      "Westlands", "Kilimani", "Lavington", "Karen", "Runda",
      "Kileleshwa", "Parklands", "Upper Hill", "CBD", "Langata",
      "South B", "South C", "Ngong Road", "Thika Road areas"
    ],
    deliveryTime: "Same day delivery for orders before 2 PM",
    bulkDelivery: "Special rates for restaurants and bulk orders"
  },

  // Payment Methods
  paymentMethods: [
    "Cash on Delivery",
    "M-Pesa",
    "Bank Transfer",
    "Credit/Debit Card (coming soon)"
  ],

  // Social Media
  socialMedia: {
    facebook: "https://facebook.com/mishafoodstuffs",
    instagram: "https://instagram.com/mishafoodstuffs",
    tiktok: "https://tiktok.com/@mishafoodstuffs"
  },

  // NEW: Flash Sales
  flashSales: [
    {
      id: 'fs1',
      productId: 'p0',
      originalPrice: 'KES 1,200.',
      salePrice: 'KES 999',
      discountPercentage: 25,
      endTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      quantity: 50,
      sold: 32,
    },
    {
      id: 'fs2',
      productId: 'p3',
      originalPrice: 'KES 1,150',
      salePrice: 'KES 999',
      discountPercentage: 23,
      endTime: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      quantity: 30,
      sold: 25,
    },
    {
      id: 'fs3',
      productId: 'p5',
      originalPrice: 'KES 1,300',
      salePrice: 'KES 1,199',
      discountPercentage: 27,
      endTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      quantity: 40,
      sold: 12,
    },
	{
      id: 'fs5',
      productId: 'p11',
      originalPrice: 'KES 350',
      salePrice: 'KES 300',
      discountPercentage: 27,
      endTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      quantity: 40,
      sold: 34,
    },
  ] as FlashSale[],

  // NEW: Recommendations
  recommendations: [
    {
      id: 'rec1',
      title: 'Complete Korean BBQ Set',
      type: 'bundle' as const,
      productIds: ['p0', 'p3', 'p5'],
      description: 'Everything you need for authentic Korean BBQ at home',
    },
    {
      id: 'rec2',
      title: 'Kimchi Lovers Bundle',
      type: 'frequently_bought' as const,
      productIds: ['p1', 'p4', 'p6'],
      description: 'Popular combination for kimchi enthusiasts',
    },
    {
      id: 'rec3',
      title: 'Ramen & Sides Combo',
      type: 'complementary' as const,
      productIds: ['p2', 'p7', 'p8'],
      description: 'Perfect sides to enhance your ramen experience',
    },
    {
      id: 'rec4',
      title: 'Trending Korean Snacks',
      type: 'trending' as const,
      productIds: ['p9', 'p10', 'p11'],
      description: 'Currently popular snacks from Korea',
    },
  ] as Recommendation[],

  // NEW: Methods to access flash sales and recommendations
  getFlashSales: function() {
    return this.flashSales;
  },

  getRecommendations: function() {
    return this.recommendations;
  },
};