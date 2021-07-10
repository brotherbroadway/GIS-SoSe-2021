    export interface UserRegForm { // User form entry as interface
        username: string;
        password: string;
        favRecipes: RecipeForm[];
    }

    export interface RecipeForm { // Recipe form entry as interface
        recipeName: string;
        ingredient1: string;
        ingredient2: string;
        ingredient3: string;
        ingredient4: string;
        ingredient5: string;
        ingredient6: string;
        ingredient7: string;
        ingredient8: string;
        recipeNotes: string;
        recipeAuthor: string;
    }