import RecipeModel from "../models/RecipeModel.js";
import RecipeView from "../views/RecipeView.js";
import { searchRecipes } from "../utils/mainSearch.js";

class RecipeController {
    constructor() {
        this.model = new RecipeModel();
        this.view = new RecipeView();
        this.searchInput = document.querySelector(".input-search");
        this.filteredRecipes = []; // Stocke les recettes filtrées
    }

    async init() {
        await this.model.loadRecipes(); // Charge les données
        this.updateView(this.model.getAllRecipes());

        // Écouter la barre de recherche
        this.searchInput.addEventListener("input", (event) => {
            this.handleSearch(event.target.value);
        });

        document.addEventListener("inputCleared", () => {
            const recipes = this.model.getAllRecipes();
            this.view.displayRecipes(recipes);
            this.filteredRecipes = recipes; // Remet les recettes complètes
        });
    }

    handleSearch(query) {
        const allRecipes = this.model.getAllRecipes();
        this.filteredRecipes = searchRecipes(allRecipes, query); // Mise à jour
        this.updateView(this.filteredRecipes);
    }

    updateView(recipes) {
        this.view.displayRecipes(recipes);
    }

    getFilteredRecipes() {
        return this.filteredRecipes; // Retourne les recettes filtrées
    }
}

export default RecipeController;
