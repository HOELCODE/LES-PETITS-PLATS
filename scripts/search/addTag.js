// Tableau pour stocker les tags sélectionnés
export let selectedTags = [];
export let deletedTags = [];

// Fonction pour gérer l'ajout d'un tag lorsqu'un lu est cliqué
const addTag = () => {
    const container = document.querySelector('.filter-total-cantainer');

    container.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const element = event.target;
            const tag = element.textContent;
            const tagClass = element.className;

            // Vérifier si le tag est déjà sélectionné
            if (!selectedTags.some(t => t.name === tag)) {
                selectedTags.push({ name: tag, class: tagClass });
                deletedTags = deletedTags.filter(t => t.name !== tag);
                updateTagsDisplay();
                // Dispatch event
                document.dispatchEvent(new Event("tagsAdded"));
                // Mettre à jour la liste des filtres
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
            
            // Supprimer le tag du tableau SelectedTags
            selectedTags = selectedTags.filter(t => t.name !== tag);
            deletedTags.push({ name: tag });
            // Ajouter le tag à la liste deletedTags
            DeleteTagDisplay(divElement);
            // Dispatch event
            document.dispatchEvent(new Event("tagsDeleted"));
            // Mettre à jour la liste des filtres
            updateFilterList(tag);
        }
    });
}

// Fonction pour afficher un tag sélectionné
const updateTagsDisplay = () => {
    const tagsContainer = document.querySelector('.tags-container');
    tagsContainer.innerHTML = ""; // Vider l'affichage actuel

    selectedTags.forEach(tag => {
        const divTag = document.createElement('div');
        divTag.classList.add('tag-container');
        divTag.innerHTML = `
            <span class="tag ${tag.class}">${tag.name}</span>
            <i class="fa-solid fa-xmark"></i>
        `;
        tagsContainer.appendChild(divTag);
    });
}

// Fonction pour supprimer l'affichage du Tag
const DeleteTagDisplay = (element) => {
    element.remove();
}

// Fonction pour mettre à jour la liste des filtres
const updateFilterList = (tag) => {
    const ulLists = document.querySelectorAll(".dropdown-list");

    ulLists.forEach(ul => {
        Array.from(ul.children).forEach(li => {
            const isSelected = selectedTags.some(tag => tag.name === li.textContent);
            li.style.display = isSelected ? "none" : "block";
        });
    });
};

// Déclaration des fonctions
document.addEventListener('recipeLoaded', addTag());
deleteTag();
