import { normalize } from "../utils/normalize.js";

class filtersSearch {
    constructor(recipes) {
        this.allRecipes = recipes;
        this.filteredRecipes = [...recipes];
        this.selectedTags = {
            ingredients: [],
            devices: [],
            utensils: []
        };
    }

    // Met à jour les tableaux des filtres en fonction des recettes filtrées
    updateFilters() {
        const ingredients = new Set();
        const devices = new Set();
        const utensils = new Set();

        this.filteredRecipes.forEach(recipe => {
            recipe.ingredients.forEach(item => ingredients.add(normalize(item.ingredient)));
            devices.add(normalize(recipe.appliance));
            recipe.ustensils.forEach(item => utensils.add(normalize(item)));
        });

        return {
            ingredients: Array.from(ingredients),
            devices: Array.from(devices),
            utensils: Array.from(utensils)
        };
    }

    // Filtre les recettes en fonction de l'input principal
    searchRecipes(query) {
        const normalizedQuery = normalize(query);
        
        this.filteredRecipes = this.allRecipes.filter(recipe => {
            return (
                normalize(recipe.name).includes(normalizedQuery) ||
                normalize(recipe.description).includes(normalizedQuery) ||
                recipe.ingredients.some(ing => normalize(ing.ingredient).includes(normalizedQuery))
            );
        });
    }

    // Ajoute un tag et filtre les recettes en conséquence
    addTag(category, value) {
        if (!this.selectedTags[category].includes(value)) {
            this.selectedTags[category].push(value);
        }
        this.applyFilters();
    }

    // Supprime un tag et filtre les recettes en conséquence
    removeTag(category, value) {
        this.selectedTags[category] = this.selectedTags[category].filter(tag => tag !== value);
        this.applyFilters();
    }

    // Applique les tags pour filtrer les recettes
    applyFilters() {
        this.filteredRecipes = this.allRecipes.filter(recipe => {
            return (
                this.selectedTags.ingredients.every(tag => recipe.ingredients.some(ing => normalize(ing.ingredient) === tag)) &&
                this.selectedTags.devices.every(tag => normalize(recipe.appliance) === tag) &&
                this.selectedTags.utensils.every(tag => recipe.ustensils.some(ut => normalize(ut) === tag))
            );
        });
    }
}

export default filtersSearch;
