// Fonction pour mettre en miniscule et enlever les accents
export const normalize = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

