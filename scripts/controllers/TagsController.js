import TagsView from "../views/TagsView.js";
import TagsModel from "../models/TagsModel.js";

// Contrôleur pour gérer les ingrédients
class TagsController {
    constructor() {
        this.model = new TagsModel();
        this.view = new TagsView();
    }

    async init() {
        await this.model.loadTags(); // Charge les données
        const Tags = this.model.getAllTags();
        this.view.displayIngredients(Tags); // Affiche les ingrédients
        this.view.displayDevices(Tags); // Affiche les appareils
        this.view.displayUtensils(Tags); // Affiche les ustensiles
    }
}

export default TagsController;