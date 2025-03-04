// Fonction pour fermer dropdown
const closeDropdown = (button, div, chevron, number) => {
    let i = 0;
    while (i < chevron.length) {
        if (i === number) {
            chevron[i].classList.toggle('fa-chevron-up');
            chevron[i].classList.add('fa-chevron-down');
            button.classList.toggle('open');
            div[i].classList.add('hidden');
        }
        i++;
    }
};

// Fonction pour ouvrir dropdown
const openDropdown = (button, div, chevron, number) => {
    let i = 0;
    while (i < chevron.length) {
        if (i === number) {
            chevron[i].classList.add('fa-chevron-up');
            chevron[i].classList.toggle('fa-chevron-down');
            button.classList.add('open');
            div[i].classList.toggle('hidden');
        }
        i++;
    }
};

// Fonction pour ouvrir et fermer le dropdown
const dropdown = () => {
    const dropdowns = document.querySelectorAll('.dropdown');
    const chevrons = document.querySelectorAll('.dropdown i');
    const dropdownContents = document.querySelectorAll('.dropdown-content');

    let i = 0;
    while (i < dropdowns.length) {
        (function (index) {
            dropdowns[index].addEventListener('click', () => {
                if (dropdownContents[index].classList.contains('hidden')) {
                    openDropdown(dropdowns[index], dropdownContents, chevrons, index);
                } else {
                    closeDropdown(dropdowns[index], dropdownContents, chevrons, index);
                }
            });
        })(i);
        i++;
    }
};

// Déclaration des fonctions
dropdown();
