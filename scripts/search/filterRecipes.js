import { normalize } from "../utils/normalize.js";

export const filterRecipes = (recipes, queries) => {
    if (!Array.isArray(queries)) queries = [queries]; // S'assurer que queries est un tableau

    // Normaliser chaque terme directement dans le tableau de queries
    queries = queries.map(query => normalize(query)); 

    return recipes.filter(recipe => 
        queries.every(query => 
            (typeof recipe.appliance === 'string' && normalize(recipe.appliance).includes(query)) || // Chercher dans l'appliance
            (Array.isArray(recipe.ustensils) && recipe.ustensils.some(ustensil => typeof ustensil === 'string' && normalize(ustensil).includes(query))) || // Chercher dans les ustensiles
            (Array.isArray(recipe.ingredients) && recipe.ingredients.some(ingredientObj => 
                typeof ingredientObj.ingredient === 'string' && normalize(ingredientObj.ingredient).includes(query)
            )) // Chercher dans les
        )
    );
};