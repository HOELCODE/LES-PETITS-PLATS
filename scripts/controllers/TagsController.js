import TagsView from "../views/TagsView.js"; // Vue
import TagsModel from "../models/TagsModel.js"; // Modèle

class TagsController {
    constructor() {
        this.model = new TagsModel(); // Crée une instance du modèle
        this.view = new TagsView(); // Crée une instance de la vue
    }

    async init() {
        // Étape 1: Charge les données
        await this.model.loadTags(); // Charge les données (ingrédients, appareils, ustensiles)

        // Étape 2: Récupère les données
        const ingredients = this.model.getIngredients(); // Liste des ingrédients
        const devices = this.model.getDevices(); // Liste des appareils
        const utensils = this.model.getUtensils(); // Liste des ustensiles

        // Étape 3: Affiche les données dans la vue
        this.view.displayIngredients(ingredients); // Affiche les ingrédients dans la vue
        this.view.displayUtensils(utensils); // Affiche les ustensiles dans la vue
        this.view.displayDevices(devices); // Affiche les appareils dans la vue

        document.addEventListener("ingredientsUpdated", (event) => {
            this.view.updateIngredientsView(event.detail);
        });
        
    }

    removeIngredientAndUpdate(ingredient) {
        this.model.removeIngredient(ingredient);
    }
}

export default TagsController;
