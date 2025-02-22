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

// Fonction pour effacer le contenu du input
const clearInput = () => {
    const input = document.querySelectorAll('input');
    const cross = document.querySelectorAll('.fa-xmark');

    cross.forEach((element, index) => {
        element.addEventListener('click', () => {
            input[index].value = '';
            element.classList.add('hidden');
            document.dispatchEvent(new Event("inputCleared"));
        });
    });

    
}

// Déclaration des fonctions
clearInput();
showCross();