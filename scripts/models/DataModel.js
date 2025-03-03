import { getData } from "../api.js";
import { normalize } from "../utils/normalize.js";

class DataModel {
    constructor() {
        // Recettes
        this.recipes = [];
        // Composants
        this.ingredients = [];
        this.devices = [];
        this.utensils = [];
    }

    async loadData() {
        this.recipes = await getData();
    }

    // Recettes

    getAllRecipes() {
        return this.recipes;
    }

    // Composants

    getAllComponents(recipes) {
                // Crée un tableau d'ingrédients
                this.ingredients = [
                    ...new Set(
                        recipes
                            .map(recipe => recipe.ingredients.map(ingredient => 
                                typeof ingredient.ingredient === 'string' ? normalize(ingredient.ingredient) : ingredient.ingredient
                            ))
                            .flat()
                    )
                ];
        
                // Crée un tableau d'appareils
                this.devices = [
                    ...new Set(
                        recipes.map(recipe => 
                            typeof recipe.appliance === 'string' ? normalize(recipe.appliance) : recipe.appliance
                        )
                    )
                ];

                // Crée un tableau d'ustensiles
                this.utensils = [
                    ...new Set(
                        recipes.flatMap(recipe => 
                            Array.isArray(recipe.ustensils) 
                                ? recipe.ustensils
                                    .filter(utensil => typeof utensil === 'string') // Vérifie que c'est bien une chaîne
                                    .map(utensil => normalize(utensil)) // Normalise les noms
                                : []
                        )
                    )
                ];
    }

    getAllIngredients() {
        return this.ingredients;
    }

    getAllDevices() {
        return this.devices;
    }

    getAllUtensils() {
        return this.utensils;
    }

}

export default DataModel;