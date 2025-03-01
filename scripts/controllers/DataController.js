import DataModel from "../models/DataModel.js";
import DataView from "../views/DataView.js";
import { searchRecipes } from "../utils/mainSearch.js";

class DataController {
    constructor() {
        this.model = new DataModel();
        this.view = new DataView();
        // Nouveaux tableaux
        this.filteredRecipes = [];
    }

    async init() {
        await this.model.loadData();
        // Recettes
        this.loadRecipeView(this.model.getAllRecipes());
        // Update Recettes view
        document.querySelector(".input-search").addEventListener("input", (event) => {
            this.handleMainInputSearch(event.target.value);
        });
        // Composants
        this.loadComponentsView(this.model.getAllComponents(this.model.getAllRecipes()));
    }

    // Recettes

    loadRecipeView(recipes) {
        this.view.displayRecipes(recipes);
    }

    handleMainInputSearch (query) {
        const allRecipes = this.model.getAllRecipes();
        this.filteredRecipes = searchRecipes(allRecipes, query);
        // Affichage des nouvelles recettes
        this.updateRecipesView(this.filteredRecipes);
        // Affichage des nouveaux composants
        this.loadComponentsView(this.model.getAllComponents(this.filteredRecipes));
    }

    updateRecipesView(recipes) {
        this.view.displayRecipes(recipes);
    }

    // Composants

    loadComponentsView() {
        this.view.displayIngredients(this.model.getAllIngredients());
        this.view.displayDevices(this.model.getAllDevices());
        this.view.displayUtensils(this.model.getAllUtensils());
    }
}

export default DataController;