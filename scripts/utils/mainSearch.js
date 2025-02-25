export const searchRecipes = (recipes, query) => {
    if (query.length < 3) {
        return recipes;
    }

    query = query.toLowerCase();
    return recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query) || 
        recipe.description.toLowerCase().includes(query) ||
        recipe.ingredients.some(obj => obj.ingredient.toLowerCase().includes(query))
    )
}