import { normalize } from "../utils/normalize.js";

const onSearch = (inputType) => {
    const input = document.querySelector(`.input-${inputType}`);
    const listItems = document.querySelectorAll(`.dropdown-list .${inputType}-li`);

    if (!input) return; // Vérification de l'existence de l'input

    input.addEventListener("input", () => {
        let filter = input.value;

        // Détection d'une tentative d'injection (balises HTML, script, SQL, etc.)
        const injectionPattern = /[<>"/'`;(){}]/g;
        if (injectionPattern.test(filter)) {
            alert("Caractères interdits détectés ! Veuillez entrer une recherche valide.");
            input.value = ""; // On vide l'input
            return;
        }

        filter = normalize(filter); // Normalisation de la valeur après vérification

        for (let i = 0; i < listItems.length; i++) {
            const texte = normalize(listItems[i].textContent);
            listItems[i].style.display = texte.includes(filter) ? "block" : "none";
        }
    });

    // Réaffichage des éléments cachés lorsque l'événement "inputTagCleared" est déclenché
    document.addEventListener("inputTagCleared", () => {
        let i = 0;
        while (i < listItems.length) {
            listItems[i].style.display = "block";
            i++;
        }
    });
};

// Attendre le chargement des tags avant d'initialiser la recherche
document.addEventListener("tagsLoaded", () => {
    onSearch("ingredient");
    onSearch("utensil");
    onSearch("device");
});
