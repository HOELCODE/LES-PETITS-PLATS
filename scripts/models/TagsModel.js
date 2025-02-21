import { getData } from "../api.js";
import { normalize } from "../utils/normalize.js";

class TagsModel {
    constructor() {
        this.ingredients = [];
        this.devices = [];
        this.utensils = [];
    }

    async loadTags() {
        const data = await getData(); // Récupère les données des recettes

        // Crée un tableau d'ingrédients
        this.ingredients = [
            ...new Set(
                data
                    .map(recipe => recipe.ingredients.map(ingredient => 
                        typeof ingredient.ingredient === 'string' ? normalize(ingredient.ingredient) : ingredient.ingredient
                    ))
                    .flat()
            )
        ];

        // Crée un tableau d'appareils
        this.devices = [
            ...new Set(
                data.map(recipe => 
                    typeof recipe.appliance === 'string' ? normalize(recipe.appliance) : recipe.appliance
                )
            )
        ];

        // Crée un tableau d'ustensiles
        this.utensils = [
            ...new Set(
                data.map(recipe => 
                    Array.isArray(recipe.ustensils)
                        ? recipe.ustensils.map(utensil => 
                            typeof utensil === 'string' ? normalize(utensil) : utensil
                        )
                        : []
                ).flat()
            )
        ];
    }

    getIngredients() {
        return this.ingredients;
    }

    removeIngredient(ingredientName) {
        this.ingredients = this.ingredients.filter(ing => ing !== ingredientName);
        document.dispatchEvent(new CustomEvent("ingredientsUpdated", { detail: this.ingredients }));
    }

    getDevices() {
        return this.devices;
    }

    getUtensils() {
        return this.utensils;
    }
}

export default TagsModel;
