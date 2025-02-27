import RecipeModel from "../models/RecipeModel.js";
import RecipeView from "../views/RecipeView.js";
import { searchRecipes } from "../utils/mainSearch.js";
import { updateRecipes } from "../utils/filtersTags.js";   

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

        // Ecouter le dispatch de l'événement tagsUpdated
        document.addEventListener("tagsAdded", () => {
            this.handleTagsUpdate();
        });

        // Ecouter le dispatch de l'événement tagsDeleted
        document.addEventListener("tagsDeleted", () => {
            this.handleTagsUpdate();
        });

        // Ecouter le dispatch de l'événement inputCleared
        document.addEventListener("inputCleared", () => {
            const recipes = this.model.getAllRecipes();
            this.view.displayRecipes(recipes);
            this.filteredRecipes = recipes; // Remet les recettes complètes
        });
    }

    handleTagsUpdate() {
        const allRecipes = this.model.getAllRecipes();
        this.filteredRecipes = updateRecipes(allRecipes); // Mise à jour
        this.updateView(this.filteredRecipes);
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
