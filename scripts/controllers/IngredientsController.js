import IngredientsView from "../views/IngredientsView.js";
import IngredientsModel from "../models/IngredientsModel.js";

// Contrôleur pour gérer les ingrédients
class IngredientsController {
    constructor() {
        this.model = new IngredientsModel();
        this.view = new IngredientsView();
    }

    async init() {
        await this.model.loadIngredients(); // Charge les données
        const ingredients = this.model.getAllIngredients();
        this.view.displayIngredients(ingredients); // Affiche les ingrédients
    }
}

export default IngredientsController;