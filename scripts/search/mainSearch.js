import { normalize } from "../utils/normalize.js";

export const searchRecipes = (recipes, query, inputElement) => {
    if (query.length < 3) {
        return recipes;
    }

    // Détection d'une tentative d'injection (balises HTML, script, SQL, etc.)
    const injectionPattern = /[<>"/'`;(){}]/g;
    if (injectionPattern.test(query)) {
        alert("Caractères interdits détectés ! Veuillez entrer une recherche valide.");
        inputElement.value = ""; // On vide l'input
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

