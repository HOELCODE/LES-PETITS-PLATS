import DataModel from "../models/DataModel.js";
import DataView from "../views/DataView.js";
import { searchRecipes } from "../utils/mainSearch.js";
import { selectedTags } from "../search/addTag.js";
import { deletedTags } from "../search/addTag.js";
import { filterRecipes } from "../search/filterRecipes.js";
import { searchDeletedTagsInData } from "../utils/searchTagInData.js";

class DataController {
    constructor() {
        this.model = new DataModel();
        this.view = new DataView();
        // Nouveaux tableaux
        this.filteredRecipes = [];
        this.lastFilteredRecipes = [];
        this.filteredRecipesDeleteTags = [];
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
            if (selectedTags.length === 1  && this.filteredRecipes.length > 0) {
                console.log("1 avant", this.filteredRecipes);
                this.handleTagFilter(this.filteredRecipes, selectedTags.map(tag => tag.name));
                console.log("1 après", this.filteredRecipes);
            }  else if (selectedTags.length > 1 && this.filteredRecipes.length > 0) {
                console.log("2 avant", this.lastFilteredRecipes);
                this.handleTagFilter(this.lastFilteredRecipes, selectedTags.map(tag => tag.name));
                console.log("2 après", this.lastFilteredRecipes);
            } else if (this.filteredRecipes.length === 0) {
                console.log("3 avant", this.filteredRecipes);
                this.handleTagFilter(this.model.getAllRecipes(), selectedTags.map(tag => tag.name));
                console.log("3 après", this.filteredRecipes);
            }
        });

        // Mettre à jour les recettes et les filtres lorsqu'un tag est supprimé
        document.addEventListener("tagsDeleted", () => {
            this.handleDeletedTag();
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
        this.loadRecipeView(this.filteredRecipes);
        this.loadComponentsView(this.model.getAllComponents(this.filteredRecipes));
    }

    // Composants

    loadComponentsView() {
        this.view.displayIngredients(this.model.getAllIngredients());
        this.view.displayDevices(this.model.getAllDevices());
        this.view.displayUtensils(this.model.getAllUtensils());
    }

    handleDeletedTag() {
        this.filteredRecipesDeleteTags = searchDeletedTagsInData(this.model.getAllRecipes(), deletedTags);
        this.lastFilteredRecipes.push(...this.filteredRecipesDeleteTags);
        this.loadRecipeView(this.lastFilteredRecipes);
        this.loadComponentsView(this.model.getAllComponents(this.lastFilteredRecipes));
    }

    handleTagFilter(liste, queries) {
        this.lastFilteredRecipes = liste;
        console.log("handleTagfilter avant", liste);
        liste = filterRecipes(liste, queries);
        console.log("handleTagFIlter après", liste);
        this.loadRecipeView(liste);
        this.loadComponentsView(this.model.getAllComponents(liste));
    }
}

export default DataController;