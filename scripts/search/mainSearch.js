import { normalize } from "../utils/normalize.js";

export const searchRecipes = (recipes, query) => {
    if (query.length < 3) {
        return recipes;
    }

    query = normalize(query);
    let result = [];

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let nameMatches = normalize(recipe.name).includes(query);
        let descriptionMatches = normalize(recipe.description).includes(query);
        let ingredientMatches = false;

        let j = 0;
        do {
            if (j >= recipe.ingredients.length) break;
            if (normalize(recipe.ingredients[j].ingredient).includes(query)) {
                ingredientMatches = true;
            }
            j++;
        } while (!ingredientMatches);

        if (nameMatches || descriptionMatches || ingredientMatches) {
            result.push(recipe);
        }
    }
    
    recipes = result
    return recipes;
};
