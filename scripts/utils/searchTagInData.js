import { normalize } from "./normalize.js";

export const  searchDeletedTagsInData = (recipes, deletedTags) => {
    return recipes.filter(recipe =>
        deletedTags.some(tag => {
            let tagName = normalize(tag.name);
            
            return recipe.ingredients.find(ingredient => normalize(ingredient.ingredient) === tagName) ||
                   normalize(recipe.appliance) === tagName ||
                   recipe.ustensils.find(ustensil => normalize(ustensil) === tagName);
        })
    );
}