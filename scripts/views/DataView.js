// Template des cartes recipes, affichage html
class DataView {
    constructor() {
        // Recettes
        this.recipeContainer = document.querySelector(".recipes-container");
        // Composants
        this.ingredientContainer = document.querySelector(".ingredient");
        this.devicesContainer = document.querySelector(".devices");
        this.utensilsContainer = document.querySelector(".utensils");
    }

    // Recettes

    displayRecipes(recipes) {
        this.recipeContainer.innerHTML = "";

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const recipeElement = document.createElement("div");
            recipeElement.classList.add("recipe");

            let ingredientsHTML = "";
            // Boucle sur les ingrédients pour construire la partie HTML
            for (let j = 0; j < recipe.ingredients.length; j++) {
                const ingredient = recipe.ingredients[j];
                ingredientsHTML += `
                    <ul>
                        <li class="ingredients">${ingredient.ingredient}</li>
                        <li class="quantity">${ingredient.quantity ?? ""} ${ingredient.unit ?? ""}</li>
                    </ul>
                `;
            }

            recipeElement.innerHTML = `
                <div class="img-time-container">
                    <img src="assets/images/${recipe.image}" alt="${recipe.name}" />
                    <span class="time">${recipe.time} min</span>
                </div>
                <div class="recipe-infos">
                    <h2>${recipe.name}</h2>
                    <div class="recipe-text">
                        <h3>RECETTE</h3>
                        <p>${recipe.description}</p>
                    </div>
                    <div class="recipe-ingredients">
                        <h3>INGRÉDIENTS</h3>
                        <div class="ingredients-container">
                            ${ingredientsHTML}
                        </div>
                    </div>
                </div>
            `;

            this.recipeContainer.appendChild(recipeElement);
        }


        // Déclenche l'événement recipeLoaded pour s'assurer de compter le nombre de recettes affichées
        document.dispatchEvent(new Event("recipeLoaded"));

    }

    // Composants

    displayIngredients(ingredients) {
        this.ingredientContainer.innerHTML = "";

        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            const li = document.createElement("li");
            li.classList.add("ingredient-li");
            li.textContent = ingredient;
            this.ingredientContainer.appendChild(li);
        }
    }


    displayUtensils(utensils) {
        this.utensilsContainer.innerHTML = "";

        for (let i = 0; i < utensils.length; i++) {
            const utensil = utensils[i];
            const li = document.createElement("li");
            li.classList.add("utensil-li");
            li.textContent = utensil;
            this.utensilsContainer.appendChild(li);
        }
    }


    displayDevices(devices) {
        this.devicesContainer.innerHTML = "";

        for (let i = 0; i < devices.length; i++) {
            const device = devices[i];
            const li = document.createElement("li");
            li.classList.add("device-li");
            li.textContent = device;
            this.devicesContainer.appendChild(li);
        }

        document.dispatchEvent(new Event("tagsLoaded"));
    }

}

export default DataView;
