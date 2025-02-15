//fonction pour fermer dropdown
const closeDropdown = (button, div, number) => {
        button.classList.toggle('fa-chevron-up');
        button.classList.add('fa-chevron-down');
        button.classList.toggle('open');
        div[number].classList.add('hidden');
}

//fonction pour ouvrir dropdown
const openDropdown = (button, div, number) => {
        button.classList.add('fa-chevron-up');
        button.classList.toggle('fa-chevron-down');
        button.classList.add('open');
        div[number].classList.toggle('hidden');
}

//fonction pour ouvrir et fermer le dropdown
const dropdown = () => {
    const dropdown = document.querySelectorAll('.dropdown');
    const dropdownContent = document.querySelectorAll('.dropdown-content');
    
    dropdown.forEach((element, index) => {
    element.addEventListener('click', () => {
        if (dropdownContent[index].classList.contains('hidden')) {
            openDropdown(element, dropdownContent, index);
        } else {
            closeDropdown(element, dropdownContent, index);
        }
    });
});
}

dropdown();