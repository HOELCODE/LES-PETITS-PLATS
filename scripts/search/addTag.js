// Tableau pour stocker les tags sélectionnés
export let selectedTags = [];
export let deletedTags = [];

// Fonction pour gérer l'ajout d'un tag lorsqu'un <li> est cliqué
const addTag = () => {
    const container = document.querySelector('.filter-total-cantainer');

    container.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const element = event.target;
            const tag = element.textContent;
            const tagClass = element.className;

            let isAlreadySelected = false;
            for (let i = 0; i < selectedTags.length; i++) {
                if (selectedTags[i].name === tag) {
                    isAlreadySelected = true;
                    break;
                }
            }

            if (!isAlreadySelected) {
                selectedTags.push({ name: tag, class: tagClass });

                let newDeletedTags = [];
                for (let i = 0; i < deletedTags.length; i++) {
                    if (deletedTags[i].name !== tag) {
                        newDeletedTags.push(deletedTags[i]);
                    }
                }
                deletedTags = newDeletedTags;

                updateTagsDisplay();
                document.dispatchEvent(new Event("tagsAdded"));
                updateFilterList(tag);
            }
        }
    });
}

// Fonction pour supprimer un tag de la liste selectedTags
const deleteTag = () => {
    const container = document.querySelector('.tags-container');

    container.addEventListener('click', (event) => {
        if (event.target.tagName === 'I') {
            const element = event.target;
            const divElement = element.parentElement;
            const spanElement = element.previousElementSibling;
            const tag = spanElement.textContent;
            const tagClass = spanElement.className;

            let newSelectedTags = [];
            for (let i = 0; i < selectedTags.length; i++) {
                if (selectedTags[i].name !== tag) {
                    newSelectedTags.push(selectedTags[i]);
                }
            }
            selectedTags = newSelectedTags;

            deletedTags.push({ name: tag, class: tagClass });

            DeleteTagDisplay(divElement);
            document.dispatchEvent(new Event("tagsDeleted"));
            updateFilterList(tag);
        }
    });
}

// Fonction pour afficher un tag sélectionné
const updateTagsDisplay = () => {
    const tagsContainer = document.querySelector('.tags-container');
    tagsContainer.innerHTML = ""; // Vider l'affichage actuel

    for (let i = 0; i < selectedTags.length; i++) {
        const tag = selectedTags[i];

        const divTag = document.createElement('div');
        divTag.classList.add('tag-container');
        divTag.innerHTML = `
            <span class="tag ${tag.class}">${tag.name}</span>
            <i class="fa-solid fa-xmark"></i>
        `;
        tagsContainer.appendChild(divTag);
    }
}

// Fonction pour supprimer l'affichage du Tag
const DeleteTagDisplay = (element) => {
    element.remove();
}

// Fonction pour mettre à jour la liste des filtres
const updateFilterList = (tag) => {
    const ulLists = document.querySelectorAll(".dropdown-list");

    for (let i = 0; i < ulLists.length; i++) {
        const ul = ulLists[i];
        const liElements = ul.children;

        for (let j = 0; j < liElements.length; j++) {
            const li = liElements[j];

            let isSelected = false;
            let k = 0;
            while (k < selectedTags.length) {
                if (selectedTags[k].name === li.textContent) {
                    isSelected = true;
                    break;
                }
                k++;
            }

            li.style.display = isSelected ? "none" : "block";
        }
    }
};

// Déclaration des fonctions
document.addEventListener('recipeLoaded', addTag());
deleteTag();
