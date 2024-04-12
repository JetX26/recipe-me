import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { response } from 'express';

const gemini = new GoogleGenerativeAI(
  'AIzaSyDUFdJG0FYEcHPhYNS4DsbfRaWqhbSJH2M',
);

@Injectable()
export class RecipeService {
    
  async getRecipe(ingredients: string[]) {
    console.log("Running")
    const model = gemini.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(
      `Give me a food recipe using some or all the following ingredients: ${ingredients.join(' ')}`,
    );
    return result.response.text();
  }
}
