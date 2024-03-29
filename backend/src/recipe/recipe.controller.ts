import { Body, Controller, Post } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/createRecipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  getRecipe(@Body() body: CreateRecipeDto) {
    return {
      ingredients: body.ingredients,
      id: body.id,
    };
  }
}
