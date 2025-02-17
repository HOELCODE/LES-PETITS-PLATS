const getData = async () => {
    try {
        const response = await fetch("../data/recipes.json");
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

