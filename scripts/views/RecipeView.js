class RecipeView {
    constructor() {
        this.recipeContainer = document.getElementById("recipe-list");
    }

    displayRecipes(recipes) {
        this.recipeContainer.innerHTML = ""; // Vide l'affichage actuel

        recipes.forEach(recipe => {
            const recipeElement = document.createElement("div");
            recipeElement.classList.add("recipe");

            recipeElement.innerHTML = `
                <h2>${recipe.name}</h2>
                <img src="./assets/images/${recipe.image}" alt="${recipe.name}">
                <p>Pour ${recipe.servings} personne(s)</p>
            `;

            this.recipeContainer.appendChild(recipeElement);
        });
    }
}

export default RecipeView;
