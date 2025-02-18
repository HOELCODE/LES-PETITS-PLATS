import { normalize } from "../utils/normalize.js";

class TagsView {
    constructor() {
        this.ingredientContainer = document.querySelector(".ingredient");
        this.devicesContainer = document.querySelector(".devices");
        this.utensilsContainer = document.querySelector(".utensils");
    }

    displayIngredients(ingredients) {
        const uniqueIngredients = new Set(); // ✅ Stocke les ingrédients uniques

        // Parcours les recettes
        ingredients.forEach(recipe => {
            recipe.ingredients.forEach(element => {
                const ingredientNormalize = normalize(element.ingredient); 
                uniqueIngredients.add(ingredientNormalize); // ✅ Ajoute sans doublon
            });
        });

        // Affiche les ingrédients uniques
        uniqueIngredients.forEach(ingredient => {
            const li = document.createElement("li");
            li.classList.add("ingredient-li");
            li.textContent = ingredient;
            this.ingredientContainer.appendChild(li);
        });
    }

    displayDevices(devices) {
        const uniqueDevices = new Set(); // ✅ Stocke les appareils uniques

        // Parcours les recettes
        devices.forEach(recipe => {
            const deviceNormalize = normalize(recipe.appliance);
            uniqueDevices.add(deviceNormalize); // ✅ Ajoute sans doublon
        });

        // Affiche les appareils uniques
        uniqueDevices.forEach(device => {
            const li = document.createElement("li");
            li.classList.add("device-li");
            li.textContent = device;
            this.devicesContainer.appendChild(li);
        });
    }

    displayUtensils(utensils) {
        const uniqueUtensils = new Set(); // ✅ Stocke les ustensiles uniques

        //Parcours les recettes
        utensils.forEach(recipe => {
            recipe.ustensils.forEach(element => {
                const utensilNormalize = normalize(element); 
                uniqueUtensils.add(utensilNormalize); // ✅ Ajoute sans doublon
            });
        });

        //Affiche les ustensiles uniques
        uniqueUtensils.forEach(utensil => {
            const li = document.createElement("li");
            li.classList.add("utensil-li");
            li.textContent = utensil;
            this.utensilsContainer.appendChild(li);
        });

        document.dispatchEvent(new Event("tagsLoaded"));

    }

}

export default TagsView;
