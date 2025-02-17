// Fonction pour gérer les données
import { getData } from "../api.js";

class IngredientsModel {
    constructor() {
        this.ingredients = [];
    }

    async loadIngredients() {
        this.ingredients = await getData();
    }

    getAllIngredients() {
        return this.ingredients;
    }
}

export default IngredientsModel;