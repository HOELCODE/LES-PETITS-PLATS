import { normalize } from "../utils/normalize.js";

class TagsView {
    constructor() {
        this.ingredientContainer = document.querySelector(".ingredient");
        this.devicesContainer = document.querySelector(".devices");
        this.utensilsContainer = document.querySelector(".utensils");
    }

    // 3 fonctions pour templater les filtres dans les 3 dropdowns

    displayIngredients(ingredients) {
        this.ingredientContainer.innerHTML = "";
        ingredients.forEach(ingredient => {
            const li = document.createElement("li");
            li.classList.add("ingredient-li");
            li.textContent = ingredient;
            this.ingredientContainer.appendChild(li);
        });
    }

    updateIngredientsView(newIngredients) {
        this.displayIngredients(newIngredients);
    }

    displayUtensils(utensils) {
        utensils.forEach(utensil => {
            const li = document.createElement("li");
            li.classList.add("utensil-li");
            li.textContent = utensil;
            this.utensilsContainer.appendChild(li);
        });
    }

    displayDevices(devices) {
        devices.forEach(device => {
            const li = document.createElement("li");
            li.classList.add("device-li");
            li.textContent = device;
            this.devicesContainer.appendChild(li);
        });

        document.dispatchEvent(new Event("tagsLoaded"));
    }


}

export default TagsView;
