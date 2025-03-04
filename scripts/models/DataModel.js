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
        this.ingredients = [];
        let seen = {};

        // Boucle sur toutes les recettes
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];

            // Boucle sur les ingrédients de chaque recette
            for (let j = 0; j < recipe.ingredients.length; j++) {
                let ingredient = recipe.ingredients[j].ingredient;

                if (typeof ingredient === 'string') {
                    ingredient = normalize(ingredient);
                }

                // Vérification si l'ingrédient est déjà ajouté
                if (!seen[ingredient]) {
                    seen[ingredient] = true;
                    this.ingredients.push(ingredient);
                }
            }
        }


        // Crée un tableau d'appareils
        this.devices = [];
        seen = {};

        // Boucle sur toutes les recettes
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            let appliance = recipe.appliance;

            // Vérification si l'appliance est une chaîne de caractères et normalisation
            if (typeof appliance === 'string') {
                appliance = normalize(appliance);
            }

            // Vérification si l'appliance a déjà été ajoutée
            if (appliance && !seen[appliance]) {
                seen[appliance] = true;
                this.devices.push(appliance);
            }
        }


        // Crée un tableau d'ustensiles
        this.utensils = [];
        seen = {};

        // Boucle sur toutes les recettes
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];

            // Vérifier si la recette a une propriété 'ustensils' et si elle est un tableau
            if (Array.isArray(recipe.ustensils)) {
                // Boucle sur chaque ustensile de la recette
                for (let j = 0; j < recipe.ustensils.length; j++) {
                    const utensil = recipe.ustensils[j];

                    // Vérifier si l'ustensile est une chaîne de caractères
                    if (typeof utensil === 'string') {
                        const normalizedUtensil = normalize(utensil);

                        // Vérification si l'ustensile a déjà été ajouté
                        if (!seen[normalizedUtensil]) {
                            seen[normalizedUtensil] = true;
                            this.utensils.push(normalizedUtensil);
                        }
                    }
                }
            }
        }

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