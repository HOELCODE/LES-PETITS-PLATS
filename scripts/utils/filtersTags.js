import { selectedTags } from './tagsLabel.js';

// Fonction pour supprimer ou ajouter une recette qui correspond à un tag sélectionné
export const updateRecipes = (filteredRecipe) => {
    
    return filteredRecipe.filter(recipe => {
        return selectedTags.some(tag =>  
            recipe.ingredients.some(obj => obj.ingredient.trim().toLowerCase() === tag.name.trim().toLowerCase()) ||
            recipe.ustensils.some(ust => ust.trim().toLowerCase() === tag.name.trim().toLowerCase()) ||
            recipe.appliance.trim().toLowerCase() === tag.name.trim().toLowerCase()
        );
        console.log(selectedTags);
        console.log(filteredRecipe);
    });
    
};


