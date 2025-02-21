//fonction pour fermer dropdown
const closeDropdown = (button, div, chevron, number) => {
        chevron[number].classList.toggle('fa-chevron-up');
        chevron[number].classList.add('fa-chevron-down');
        button.classList.toggle('open');
        div[number].classList.add('hidden');
}

//fonction pour ouvrir dropdown
const openDropdown = (button, div, chevron, number) => {
        chevron[number].classList.add('fa-chevron-up');
        chevron[number].classList.toggle('fa-chevron-down');
        button.classList.add('open');
        div[number].classList.toggle('hidden');
}

//fonction pour ouvrir et fermer le dropdown
const dropdown = () => {
    const dropdown = document.querySelectorAll('.dropdown');
    const chevron = document.querySelectorAll('.dropdown i');
    const dropdownContent = document.querySelectorAll('.dropdown-content');
    
    dropdown.forEach((element, index) => {
    element.addEventListener('click', () => {
        if (dropdownContent[index].classList.contains('hidden')) {
            openDropdown(element, dropdownContent, chevron, index);
        } else {
            closeDropdown(element, dropdownContent, chevron, index);
        }
    });
});
}

// Déclaration des fonctions
dropdown();