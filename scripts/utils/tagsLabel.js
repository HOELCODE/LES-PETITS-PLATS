// Fonction pour gérer l'ajout des tags lorsqu'un li est cliqué
const tagsLabel = () => {
    const container = document.querySelector('.filter-total-cantainer');
    const tagsContainer = document.querySelector('.tags-container');

    container.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const element = event.target;
            const tag = element.textContent;
            const tagClass = element.className;
            const divTag = document.createElement('div');
            divTag.classList.add('tag-container');

            // Création du tag
            divTag.innerHTML = `
                <span class="tag ${tagClass}">${tag}</span>
                <i class="fa-solid fa-xmark"></i>
            `;

            tagsContainer.appendChild(divTag);
            element.remove();

            removeTagsLabel();
        }
    });
}

// Fonction pour réinsérer le tag dans sa liste d'origine en évitant les doublons
const addTagsToList = (tagContent, tagClass) => {
    const ulLists = document.querySelectorAll(".dropdown-list");
    let targetUl = null;

    // Déterminer la bonne liste où réinsérer l'élément
    if (tagClass === 'ingredient-li' && ulLists[0]) {
        targetUl = ulLists[0];
    } else if (tagClass === 'device-li' && ulLists[1]) {
        targetUl = ulLists[1];
    } else if (ulLists[2]) {
        targetUl = ulLists[2];
    }

    // Vérifier si l'élément existe déjà dans la liste
    if (targetUl) {
        const existingLi = Array.from(targetUl.children).find(li => 
            li.textContent === tagContent && li.className === tagClass
        );

        if (!existingLi) { // Ajouter seulement si l'élément n'existe pas
            const newLi = document.createElement('li');
            newLi.className = tagClass;
            newLi.textContent = tagContent;
            targetUl.appendChild(newLi);
        }
    }
};

// Fonction pour supprimer les tags
const removeTagsLabel = () => {
    document.querySelectorAll('.tags-container i').forEach(tag => {
        tag.addEventListener('click', () => {
            const tagDiv = tag.parentElement;
            const tagSpan = tagDiv.querySelector('span');

            addTagsToList(tagSpan.textContent, tagSpan.classList[1]);
            tagDiv.remove();
        });
    });
}

// Attendre que l'événement soit déclenché
document.addEventListener("tagsLoaded", () => {
    tagsLabel();
});
