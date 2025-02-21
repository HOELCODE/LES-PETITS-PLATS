import RecipeController from "./controllers/RecipeController.js";
import TagsController from "./controllers/TagsController.js";

// Initialise l'application
const Recipe = new RecipeController();
const Tags = new TagsController();
Recipe.init();
Tags.init();
