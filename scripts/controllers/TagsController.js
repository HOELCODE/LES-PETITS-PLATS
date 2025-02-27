import TagsView from "../views/TagsView.js"; 
import TagsModel from "../models/TagsModel.js"; 
import RecipeController from "./RecipeController.js";

class TagsController {
    constructor() {
        this.model = new TagsModel();
        this.view = new TagsView();
        this.recipeController = new RecipeController();
    }

    async init() {
        await this.recipeController.init(); // Assure que les recettes sont chargées avant
        await this.updateTagsView(); // Met à jour les tags dès le début

        // Écoute la barre de recherche
        document.querySelector(".input-search").addEventListener("input", () => {
            this.updateTagsView();
        });

        document.addEventListener("inputCleared", () => {
            this.updateTagsView();
        });
    }

    async updateTagsView() {
        let filteredRecipes = this.recipeController.getFilteredRecipes(); // Récupère les recettes filtrées

        console.log("test",filteredRecipes);

        if (filteredRecipes.length === 0) {
            await this.model.loadAllTags(); // Charge tous les tags
        } else {
            this.model.loadTagsFromRecipes(filteredRecipes); // Charge les tags filtrés
        }

        // Met à jour la vue
        this.view.displayIngredients(this.model.getIngredients());
        this.view.displayUtensils(this.model.getUtensils());
        this.view.displayDevices(this.model.getDevices());
    }
}

export default TagsController;
