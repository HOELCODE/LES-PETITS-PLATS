// Fonction pour ajouter afficher les filtre cliqués
const tagsLabel = () => {
    const li = document.querySelectorAll('.filter-total-cantainer li');
    const tagsContainer = document.querySelector('.tags-container');

    li.forEach(element => {
        element.addEventListener('click', () => {
            const tag = element.textContent;
            const tagClass = element.className;
            const divTag = document.createElement('div');
            divTag.classList.add('tag-container');
            divTag.setAttribute('onclick', 'removeTagsLabel()');

            divTag.innerHTML = `
                <span class="tag ${tagClass}">${tag}</span>
                <i class="fa-solid fa-xmark"></i>
            `;

            tagsContainer.appendChild(divTag);
            element.textContent = '';
        });
    });

}

// Fonction pour remettre le tag dans la liste
const addTagsToList = (tagContent, tagClass) => {
    const ul = document.querySelectorAll(".dropdown-list");

    if (tagClass = 'ingredient-li') {
        ul[0].innerHTML += `<li class="
        ${tagClass}">${tagContent}</li>`;
    } else if (tagClass = 'device-li') {
        ul[1].innerHTML += `<li class="
        ${tagClass}">${tagContent}</li>`;
    } else {
        ul[2].innerHTML += `<li class="
        ${tagClass}">${tagContent}</li>`;
    }
    
};

// Fonction pour supprimer les tags
const removeTagsLabel = () => {
    const tagContainerMark = document.querySelectorAll('.tag-container i');
    const tagDiv = document.querySelectorAll('.tag-container');
    const tagSpan = document.querySelectorAll('.tag-container span');


    tagContainerMark.forEach((tag, index) => {
        tag.addEventListener('click', () => {
            tagDiv[index].remove();
            addTagsToList(tagSpan[index].textContent, tagSpan[index].className);
        });
    });
}

document.addEventListener("tagsLoaded", () => {
    tagsLabel();
});