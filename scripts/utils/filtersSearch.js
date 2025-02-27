import { normalize } from "./normalize.js";

const onSearch = (inputType) => {
    const input = document.querySelector(`.input-${inputType}`);
    const listItems = document.querySelectorAll(`.${inputType}-li`);

    if (!input) return; // Vérification de l'existence de l'input

    input.addEventListener("input", () => {
        const filter = normalize(input.value); // Récupérer la valeur au moment de l'input

        listItems.forEach((el) => {
            const texte = normalize(el.textContent);
            el.style.display = texte.includes(filter) ? "" : "none";
        });
    });
};    

// Attendre le chargement des tags avant d'initialiser la recherche
document.addEventListener("tagsLoaded", () => {
    onSearch("ingredient");
    onSearch("utensil");
    onSearch("device");
});
