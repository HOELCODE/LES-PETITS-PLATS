import RecipeModel from "../models/RecipeModel.js";
import RecipeView from "../views/RecipeView.js";
import { searchRecipes } from "../utils/mainSearch.js";

// Contrôleur pour gérer les recettes
class RecipeController {
    constructor() {
        this.model = new RecipeModel();
        this.view = new RecipeView();
        this.searchInput = document.querySelector(".input-search")
    }

    async init() {
        await this.model.loadRecipes(); // Charge les données
        this.updateView(this.model.getAllRecipes())

        // Ecouter barre de recherche
        this.searchInput.addEventListener("input", (event) => {
            this.handleSearch(event.target.value)
        });

        document.addEventListener("inputCleared", () => {
            const recipes = this.model.getAllRecipes();
            this.view.displayRecipes(recipes); // Affiche les recettes
        });

        //const recipes = this.model.getAllRecipes();
        //this.view.displayRecipes(recipes); // Affiche les recettes
    }

    handleSearch(query) {
        const allRecipes = this.model.getAllRecipes();
        const filteredRecipes = searchRecipes(allRecipes, query);
        this.updateView(filteredRecipes);
    }

    updateView(recipes) {
        this.view.displayRecipes(recipes);
    }
}

export default RecipeController;
