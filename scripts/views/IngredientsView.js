class IngredientsView {
    constructor() {
        this.ingredientContainer = document.querySelector(".ingredient");
    }

    displayIngredients(ingredients) {
        const uniqueIngredients = new Set(); // ✅ Stocke les ingrédients uniques

        // Parcours les recettes
        ingredients.forEach(recipe => {
            recipe.ingredients.forEach(element => {
                uniqueIngredients.add(element.ingredient); // ✅ Ajoute sans doublon
            });
        });

        // Affiche les ingrédients uniques
        uniqueIngredients.forEach(ingredient => {
            const li = document.createElement("li");
            li.textContent = ingredient;
            this.ingredientContainer.appendChild(li);
        });
    }
}

export default IngredientsView;
