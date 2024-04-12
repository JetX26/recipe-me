import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/createRecipe.dto';
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: RecipeService);
    getRecipe(body: CreateRecipeDto): Promise<string>;
}
