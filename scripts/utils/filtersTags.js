import { selectedTags } from './tagsLabel.js';
import { normalize } from './normalize.js';

// Fonction pour supprimer ou ajouter une recette qui correspond à un tag sélectionné
export let recipeDeleted = []; 

export const updateRecipes = (recipes) => {
    if (selectedTags.length === 0) {
        recipeDeleted = []; 
        return recipes; 
    }

    const filteredRecipes = recipes.filter(recipe => 
        selectedTags.every(tag => {
            const tagName = normalize(tag.name);
            return recipe.ingredients.some(obj => normalize(obj.ingredient) === tagName) ||
                   recipe.ustensils.some(ustensil => normalize(ustensil) === tagName) ||
                   normalize(recipe.appliance) === tagName;
        })
    );

    recipeDeleted = recipes.filter(recipe => !filteredRecipes.includes(recipe));

    return filteredRecipes;
};
