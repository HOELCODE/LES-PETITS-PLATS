// Tableau pour stocker les tags sélectionnés
export let selectedTags = [];

// Fonction pour gérer l'ajout des tags lorsqu'un li est cliqué
const tagsLabel = () => {
    const container = document.querySelector('.filter-total-cantainer');

    container.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const element = event.target;
            const tag = element.textContent;
            const tagClass = element.className;

            // Vérifier si le tag est déjà sélectionné
            if (!selectedTags.some(t => t.name === tag)) {
                selectedTags.push({ name: tag, class: tagClass });
                updateTagsDisplay();
            }
        }
        
    });
};

// Fonction pour mettre à jour l'affichage des tags sélectionnés
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
        divTag.querySelector("i").addEventListener("click", () => removeTag(tag.name));
        tagsContainer.appendChild(divTag);
    });

    updateFilterList();
};

// Fonction pour supprimer un tag sélectionné
const removeTag = (tagName) => {
    selectedTags = selectedTags.filter(tag => tag.name !== tagName);
    updateTagsDisplay();
};

// Fonction pour mettre à jour la liste des filtres
const updateFilterList = () => {
    const ulLists = document.querySelectorAll(".dropdown-list");

    ulLists.forEach(ul => {
        Array.from(ul.children).forEach(li => {
            const isSelected = selectedTags.some(tag => tag.name === li.textContent);
            li.style.display = isSelected ? "none" : "block";
            dispatchTagsEvent(isSelected ? "none" : "block");
        });
    });
};

//Fonction pour dispatch tagsAdded ou tagsDeleted
const dispatchTagsEvent = (display) => {
    if (display === "block") {
        document.dispatchEvent(new Event("tagsAdded"));
    }
    else {
        document.dispatchEvent(new Event("tagsDeleted"));
    }
};

// Attendre que l'événement soit déclenché
document.addEventListener("tagsLoaded", () => {
    tagsLabel();
});