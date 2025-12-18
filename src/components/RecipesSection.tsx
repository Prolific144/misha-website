import React, { useState } from 'react';
import type { Recipe } from '@types';
import { ChefHat, Clock, Users, Flame } from 'lucide-react';

interface RecipesSectionProps {
  recipes: Recipe[];
}

export const RecipesSection: React.FC<RecipesSectionProps> = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<number>(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Korean Recipes</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover authentic Korean recipes using our products
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Recipe Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes.map((recipe, index) => (
            <button
              key={recipe.title}
              onClick={() => setSelectedRecipe(index)}
              className={`text-left p-4 rounded-2xl transition-all ${
                selectedRecipe === index
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white hover:shadow-lg'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={recipe.img}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className={`font-bold text-lg mb-2 ${
                    selectedRecipe === index ? 'text-white' : 'text-gray-800'
                  }`}>
                    {recipe.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      30min
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      2-4
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Recipe Details */}
        {recipes[selectedRecipe] && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">{recipes[selectedRecipe].title}</h3>
              <img
                src={recipes[selectedRecipe].img}
                alt={recipes[selectedRecipe].title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ingredients */}
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center">
                  <ChefHat className="w-5 h-5 mr-2 text-primary" />
                  Ingredients
                </h4>
                <ul className="space-y-2">
                  {recipes[selectedRecipe].ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="font-bold text-lg mb-4 flex items-center">
                  <Flame className="w-5 h-5 mr-2 text-primary" />
                  Instructions
                </h4>
                <ol className="space-y-4">
                  {recipes[selectedRecipe].steps.map((step, idx) => (
                    <li key={idx} className="flex">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};