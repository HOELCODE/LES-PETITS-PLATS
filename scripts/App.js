import RecipeController from "./controllers/RecipeController.js";
import TagsController from "./controllers/TagsController.js";

// Initialise l'application
const app = new RecipeController();
const app2 = new TagsController();
app.init();
app2.init();

