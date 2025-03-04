// Fonction pour afficher la croix quand on commence à écrire dans l'input
const showCross = () => {
    const inputs = document.querySelectorAll('input');
    const crosses = document.querySelectorAll('.fa-xmark');

    let i = 0;
    while (i < inputs.length) {
        (function(index) {
            inputs[index].addEventListener('input', () => {
                if (inputs[index].value.length > 0) {
                    crosses[index].classList.remove('hidden');
                } else {
                    crosses[index].classList.add('hidden');
                }
            });
        })(i);
        i++;
    }
};

// Fonction pour effacer le contenu de l'input principal
const clearInput = () => {
    const input = document.querySelector('.input-search');
    const cross = document.querySelector('.main-cross');

    if (input && cross) {
        cross.addEventListener('click', () => {
            input.value = '';
            cross.classList.add('hidden');
            document.dispatchEvent(new Event("inputCleared"));
        });
    }
};

// Fonction pour effacer le contenu des inputs des tags
const clearTagInput = () => {
    const inputs = document.querySelectorAll('.input-filter');
    const crosses = document.querySelectorAll('.filters-cross');

    let i = 0;
    while (i < crosses.length) {
        (function(index) {
            crosses[index].addEventListener('click', () => {
                inputs[index].value = '';
                crosses[index].classList.add('hidden');
                document.dispatchEvent(new Event("inputTagCleared"));
            });
        })(i);
        i++;
    }
};

// Fonction pour vider le contenu de tous les inputs au chargement 
const clearAllInputs = () => { 
    const inputs = document.querySelectorAll('input');

    document.addEventListener('DOMContentLoaded', () => {
        let i = 0;
        while (i < inputs.length) {
            inputs[i].value = '';
            i++;
        }
    });
};

// Déclaration des fonctions
document.addEventListener('recipeLoaded', () => {
    showCross();
    clearInput();
    clearTagInput();
});

clearAllInputs();
