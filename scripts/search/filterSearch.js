import { normalize } from "../utils/normalize.js";

const onSearch = (inputType) => {
    const input = document.querySelector(`.input-${inputType}`);
    const listItems = document.querySelectorAll(`.dropdown-list .${inputType}-li`);

    if (!input) return; // Vérification de l'existence de l'input

    input.addEventListener("input", () => {
        const filter = normalize(input.value); // Récupérer la valeur au moment de l'input

        listItems.forEach((el) => {
            const texte = normalize(el.textContent);
            el.style.display = texte.includes(filter) ? "block" : "none";
        });
    });

    // Réaffichage des éléments cachés lorsque l'événement "inputTagCleared" est déclenché
    document.addEventListener("inputTagCleared", () => {
        listItems.forEach((el) => {
            el.style.display = "block";
        });
    });
};

// Attendre le chargement des tags avant d'initialiser la recherche
document.addEventListener("tagsLoaded", () => {
    onSearch("ingredient");
    onSearch("utensil");
    onSearch("device");
});
