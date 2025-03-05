// Fonction qui récupère les données
const getData = async () => {
    try {
        const response = await fetch("/LES-PETITS-PLATS/data/recipes.json");
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des données.");
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur API :", error);
        return [];
    }
};

export { getData };