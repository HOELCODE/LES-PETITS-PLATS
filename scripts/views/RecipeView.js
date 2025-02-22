// Template des cartes recipes, affichage html
class RecipeView {
    constructor() {
        this.recipeContainer = document.querySelector(".recipes-container");
    }
 
    displayRecipes(recipes) {
        this.recipeContainer.innerHTML = "";
    
        recipes.forEach(recipe => {
            const recipeElement = document.createElement("div");
            recipeElement.classList.add("recipe");
    
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
                            ${recipe.ingredients.map(ingredient => `
                                <ul>
                                    <li class="ingredients">${ingredient.ingredient}</li>
                                    <li class="quantity">${ingredient.quantity ?? ""} ${ingredient.unit ?? ""}</li>
                                </ul>
                            `).join("")}
                        </div>
                    </div>
                </div>
            `;
    
            this.recipeContainer.appendChild(recipeElement);
        });

        // Déclenche l'événement recipeLoaded pour s'assurer de compter le nombre de recettes affichées
        document.dispatchEvent(new Event("recipeLoaded"));
    }
 
}  

export default RecipeView;
