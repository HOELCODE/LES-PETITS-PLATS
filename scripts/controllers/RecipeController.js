import RecipeModel from "../models/RecipeModel.js";
import RecipeView from "../views/RecipeView.js";

class RecipeController {
    constructor() {
        this.model = new RecipeModel();
        this.view = new RecipeView();
    }

    async init() {
        await this.model.loadRecipes(); // Charge les données
        const recipes = this.model.getAllRecipes();
        this.view.displayRecipes(recipes); // Affiche les recettes
    }
}

export default RecipeController;
