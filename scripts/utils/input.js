// Fonction pour afficher la croix quand on commence à écrire dans le input
const showCross = () => {
    const input = document.querySelectorAll('input');
    const cross = document.querySelectorAll('.fa-xmark');

    input.forEach((element, index) => {
        element.addEventListener('input', () => {
            if (element.value.length > 0) {
                cross[index].classList.remove('hidden');
            } else {
                cross[index].classList.add('hidden');
            }
        });
    });
}

// Fonction pour effacer le contenu du input main
const clearInput = () => {
    const input = document.querySelector('.input-search');
    const cross = document.querySelector('.main-cross');

    cross.addEventListener('click', () => {
        input.value = '';
        cross.classList.add('hidden');
        document.dispatchEvent(new Event("inputCleared"));
    });
}

// Fonction pour effacer le contenu du input des tags
const clearTagInput = () => {
    const input = document.querySelectorAll('.input-filter');
    const cross = document.querySelectorAll('.filters-cross');

    cross.forEach((element, index) => {
        element.addEventListener('click', () => {
            input[index].value = '';
            element.classList.add('hidden');
            document.dispatchEvent(new Event("inputTagCleared"));
        });
    });
}

// Fonction pour vider le contenu de tous les input au chargement 
const clearAllInputs = () => { 
    const input = document.querySelectorAll('input');
    document.addEventListener('DOMContentLoaded', () => {
        input.forEach(element => {
            element.value = '';
        });
    });
}

// Déclaration des fonctions
document.addEventListener('recipeLoaded', () => {
    showCross();
    clearInput();
    clearTagInput();
});

clearAllInputs();