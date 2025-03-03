import { totalRecipes } from "./totalRecipes.js"

const suggestion = () => {
    const contenuInput = document.querySelector('.input-search').value;
    const suggestionSpan = document.querySelector('.suggestion span');
    if (totalRecipes() < 1) {
        const suggestionDiv = document.querySelector('.suggestion');
        suggestionDiv.classList.remove('hidden');
        suggestionSpan.textContent = contenuInput;
    } else {
        const suggestionDiv = document.querySelector('.suggestion');
        suggestionDiv.classList.add('hidden');
    }
}

document.addEventListener("recipeLoaded", () => {
    suggestion();
});