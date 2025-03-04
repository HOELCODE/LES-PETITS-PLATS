import { normalize } from "../utils/normalize.js";

export const filterRecipes = (recipes, queries) => {
    if (!Array.isArray(queries)) {
        queries = [queries]; // S'assurer que queries est un tableau
    }

    // Normaliser chaque terme de queries
    let normalizedQueries = [];
    for (let i = 0; i < queries.length; i++) {
        normalizedQueries.push(normalize(queries[i]));
    }

    let filteredRecipes = [];

    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        let allQueriesMatch = true;

        for (let j = 0; j < normalizedQueries.length; j++) {
            let query = normalizedQueries[j];
            let found = false;

            // Vérifier dans appliance
            if (typeof recipe.appliance === 'string' && normalize(recipe.appliance).includes(query)) {
                found = true;
            }

            // Vérifier dans ustensils
            if (!found && Array.isArray(recipe.ustensils)) {
                let k = 0;
                while (k < recipe.ustensils.length) {
                    if (typeof recipe.ustensils[k] === 'string' && normalize(recipe.ustensils[k]).includes(query)) {
                        found = true;
                        break;
                    }
                    k++;
                }
            }

            // Vérifier dans ingredients
            if (!found && Array.isArray(recipe.ingredients)) {
                let l = 0;
                while (l < recipe.ingredients.length) {
                    if (typeof recipe.ingredients[l].ingredient === 'string' && normalize(recipe.ingredients[l].ingredient).includes(query)) {
                        found = true;
                        break;
                    }
                    l++;
                }
            }

            if (!found) {
                allQueriesMatch = false;
                break;
            }
        }

        if (allQueriesMatch) {
            filteredRecipes.push(recipe);
        }
    }
    
    recipes = filteredRecipes
    return recipes;
};
