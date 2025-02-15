//fonction pour ouvrir et fermer le dropdown
const dropdown = () => {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    dropdown.addEventListener('click', () => {
        if (dropdownContent.classList.contains('dropdown-content-open')) {
            dropdownContent.classList.remove('dropdown-content-open');
            dropdownContent.classList.add('dropdown-content-close');
        } else {
            dropdownContent.classList.remove('dropdown-content-close');
            dropdownContent.classList.add('dropdown-content-open');
        }
    });
}   