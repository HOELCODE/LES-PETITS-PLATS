import { getData } from "../api.js";

class RecipeModel {
    constructor() {
        this.recipes = [];
    }

    async loadRecipes() {
        this.recipes = await getData();
    }

    getAllRecipes() {
        return this.recipes;
    }
}

export default RecipeModel;
