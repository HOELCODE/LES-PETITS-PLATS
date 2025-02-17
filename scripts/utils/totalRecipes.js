//compter le nombre de recette affichée sur la page
const totalRecipes = () => {
    const recipes = document.querySelectorAll('.recipe');
    const totalDiv = document.querySelector('.total-recipes');

    const total = recipes.length;

    totalDiv.textContent = `${total} recettes`;
    return total;
}

//Déclaration de l'événement recipeLoaded
document.addEventListener("recipeLoaded", () => {
    totalRecipes();
});