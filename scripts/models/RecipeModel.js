// Fonction pour gérer les données
import { getData } from "../api.js";

class RecipeModel {
    constructor() {
        this.recipes = [];
        this.filteredRecipes = [];
    }

    async loadRecipes() {
        this.recipes = await getData();
    }

    getAllRecipes() {
        return this.recipes;
    }

    getFilteredRecipes() {
        return this.filteredRecipes;
    }


}

export default RecipeModel;
