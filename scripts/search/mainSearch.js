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

    return recipes.filter(recipe => 
        normalize(recipe.name).includes(query) || 
        normalize(recipe.description).includes(query) ||
        recipe.ingredients.some(obj => normalize(obj.ingredient).includes(query))
    );
};
