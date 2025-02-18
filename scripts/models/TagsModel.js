// Fonction pour gérer les données
import { getData } from "../api.js";

class TagsModel {
    constructor() {
        this.tags = [];
    }

    async loadTags() {
        this.tags = await getData();
    }

    getAllTags() {
        return this.tags;
    }
}

export default TagsModel;