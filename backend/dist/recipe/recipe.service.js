"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const common_1 = require("@nestjs/common");
const gemini = new generative_ai_1.GoogleGenerativeAI('AIzaSyDUFdJG0FYEcHPhYNS4DsbfRaWqhbSJH2M');
let RecipeService = class RecipeService {
    async getRecipe(ingredients) {
        console.log("Running");
        const model = gemini.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent(`Give me a food recipe using some or all the following ingredients: ${ingredients.join(' ')}`);
        return result.response.text();
    }
};
exports.RecipeService = RecipeService;
exports.RecipeService = RecipeService = __decorate([
    (0, common_1.Injectable)()
], RecipeService);
//# sourceMappingURL=recipe.service.js.map