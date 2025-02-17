import RecipeController from "./controllers/RecipeController.js";
import IngredientsController from "./controllers/IngredientsController.js";

// Initialise l'application
const app = new RecipeController();
const app2 = new IngredientsController();
app.init();
app2.init();

