import { normalize } from "../utils/normalize.js";

export const filterRecipes = (recipes, queries) => {
    if (!Array.isArray(queries)) queries = [queries]; // S'assurer que queries est un tableau
    queries = queries.map(normalize); // Normaliser chaque terme

    return recipes.filter(recipe => 
        queries.every(query => 
            normalize(recipe.name).includes(query) || 
            normalize(recipe.description).includes(query) ||
            recipe.ingredients.some(obj => normalize(obj.ingredient).includes(query))
        )
    );
};
