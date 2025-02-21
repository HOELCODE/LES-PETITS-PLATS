import TagsController from "../controllers/TagsController.js";

const tagsController = new TagsController();
const bouton = document.querySelector(".bouton-test")

bouton.addEventListener('click', () => {
    tagsController.init().then(() => {
        // ✅ Supprime "lait de coco" après le chargement
        tagsController.removeIngredientAndUpdate("glacons");
    });
})

