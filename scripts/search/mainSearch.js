import { normalize } from "../utils/normalize.js";

export const searchRecipes = (recipes, query) => {
    if (query.length < 3) {
        return recipes;
    }

    query = normalize(query);
    return recipes.filter(recipe => 
        normalize(recipe.name).includes(query) || 
        normalize(recipe.description).includes(query) ||
        recipe.ingredients.some(obj => normalize(obj.ingredient).includes(query))
    )
}