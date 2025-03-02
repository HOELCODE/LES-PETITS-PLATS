import DataModel from "../models/DataModel.js";
import DataView from "../views/DataView.js";
import { searchRecipes } from "../utils/mainSearch.js";
import { selectedTags } from "../search/addTag.js";

class DataController {
    constructor() {
        this.model = new DataModel();
        this.view = new DataView();
        // Nouveaux tableaux
        this.filteredRecipes = [];
        this.lastFilteredRecipes = [];
    }

    async init() {
        await this.model.loadData();
        // Recettes
        this.loadRecipeView(this.model.getAllRecipes());
        // Mettre à jour les recettes lorsqu'une recherche est fait sur le main search
        document.querySelector(".input-search").addEventListener("input", (event) => {
            this.handleMainInputSearch(event.target.value);
        });
        // Mettre à jour les recettes et les filtres lorsqu'un tag est ajouté
        document.addEventListener("tagsAdded", () => {
            if (this.filteredRecipes.length > 0) {
            this.handleTagFilter(this.filteredRecipes, selectedTags.map(tag => tag.name).join(" "));
            } else {
            this.handleTagFilter(this.model.getAllRecipes(), selectedTags.map(tag => tag.name).join(" "));
            }
        });
        // Mettre à jour les recettes et les filtres lorsqu'un tag est supprimé
        document.addEventListener("tagsDeleted", () => {
            this.filteredRecipes = this.lastFilteredRecipes;
            this.updateRecipesView(this.lastFilteredRecipes);
            this.loadComponentsView(this.model.getAllComponents(this.lastFilteredRecipes));
        });

        // Composants
        this.loadComponentsView(this.model.getAllComponents(this.model.getAllRecipes()));
    }

    // Recettes

    loadRecipeView(recipes) {
        this.view.displayRecipes(recipes);
    }

    handleMainInputSearch(query) {
        const allRecipes = this.model.getAllRecipes();
        this.filteredRecipes = searchRecipes(allRecipes, query);
        // Affichage des nouvelles recettes
        this.updateRecipesView(this.filteredRecipes);
        // Affichage des nouveaux composants
        this.loadComponentsView(this.model.getAllComponents(this.filteredRecipes));
    }

    handleTagFilter(liste, query) {
        this.lastFilteredRecipes = liste;
        liste = searchRecipes(liste, query);
        // Affichage des nouvelles recettes
        this.updateRecipesView(liste);
        // Affichage des nouveaux composants
        this.loadComponentsView(this.model.getAllComponents(liste));
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