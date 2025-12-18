// src/config/recipes.ts
//import { Recipe } from '@/config';

interface Recipe {
  id: string;
  title: string;
  img: string;
  ingredients: string[];
  steps: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  prepTime?: number;
  cookTime?: number;
  serving?: number;
}

export const RECIPES: Recipe[] = [
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
];

export const getFeaturedRecipes = (): Recipe[] => {
  return RECIPES.slice(0, 3); // First 3 as featured
};

export const getAllRecipes = (): Recipe[] => {
  return RECIPES;
};