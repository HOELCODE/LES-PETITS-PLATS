import DataModel from "../models/DataModel.js";
import DataView from "../views/DataView.js";
import { searchRecipes } from "../search/mainSearch.js";
import { selectedTags } from "../search/addTag.js";
import { filterRecipes } from "../search/filterRecipes.js";

class DataController {
    constructor() {
        this.model = new DataModel();
        this.view = new DataView();
        // Nouveaux tableaux
        this.filteredRecipes = [];
        this.lastFilteredRecipes = [];
        this.initialRecipe = [];
    }

    async init() {
        await this.model.loadData();

        // Recettes
        this.loadRecipeView(this.model.getAllRecipes());

        // Composants
        this.loadComponentsView(this.model.getAllComponents(this.model.getAllRecipes()));

        // Mettre à jour les recettes lorsqu'une recherche est fait sur le main search
        document.querySelector(".input-search").addEventListener("input", (event) => {
            this.handleMainInputSearch(event.target.value);
        });

        // Mettre à jour les recettes et les filtres lorsqu'un tag est ajouté
        document.addEventListener("tagsAdded", () => {
            if (this.filteredRecipes.length === 0) {
                this.handleTagFilter(this.model.getAllRecipes(), selectedTags.map(tag => tag.name));
            } else {
                this.handleTagFilter(this.filteredRecipes, selectedTags.map(tag => tag.name));
            }

        });

        // Mettre à jour les recettes et les filtres lorsqu'un tag est supprimé
        document.addEventListener("tagsDeleted", () => {
            if (selectedTags.length < 1) {
                if (document.querySelector(".input-search").value === "") {
                    this.loadRecipeView(this.model.getAllRecipes());
                    this.loadComponentsView(this.model.getAllComponents(this.model.getAllRecipes()));
                } else {
                    this.loadRecipeView(this.initialRecipe);
                    this.loadComponentsView(this.model.getAllComponents(this.initialRecipe));

                }
            } else {
                this.handleDeletedTag();
            }
        });

        // Mettre à jour les recettes lorsque main input est effacé
        document.addEventListener("inputCleared", () => {
            this.loadRecipeView(this.model.getAllRecipes());
            this.loadComponentsView(this.model.getAllComponents(this.model.getAllRecipes()));
        });        

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
        this.initialRecipe = this.filteredRecipes;
    }

    // Composants

    loadComponentsView() {
        this.view.displayIngredients(this.model.getAllIngredients());
        this.view.displayDevices(this.model.getAllDevices());
        this.view.displayUtensils(this.model.getAllUtensils());
    }

    handleDeletedTag() {
        this.loadRecipeView(this.lastFilteredRecipes);
        this.loadComponentsView(this.model.getAllComponents(this.lastFilteredRecipes));
    }

    handleTagFilter(liste, queries) {
        this.lastFilteredRecipes = liste;
        this.filteredRecipes = filterRecipes(liste, queries);
        this.loadRecipeView(this.filteredRecipes);
        this.loadComponentsView(this.model.getAllComponents(this.filteredRecipes));
    }

    getLastTagList = () => {
        const tagsInput = document.querySelectorAll('.input-filter');
        const liIngredients = document.querySelectorAll('.ingredient-li');
        const liAppareils = document.querySelectorAll('.device-li');
        const liUstensils = document.querySelectorAll('.utensil-li');

        this.tagList = [];

        tagsInput.forEach((input, index) => {
            input.addEventListener('input', () => {
                if (index === 0) {
                    this.tagList = [... this.tagList, ...liIngredients];
                } else if (index === 1) {
                    this.tagList = [... this.tagList, ...liAppareils];
                } else if (index === 2) {
                    this.tagList = [... this.tagList, ...liUstensils];
                }
                
            });
        });
    }
}

export default DataController;