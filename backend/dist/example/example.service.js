"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const common_1 = require("@nestjs/common");
const gemini = new generative_ai_1.GoogleGenerativeAI('AIzaSyDUFdJG0FYEcHPhYNS4DsbfRaWqhbSJH2M');
let ExampleService = class ExampleService {
    sayHello() {
        console.log('Hello World');
    }
    async getRecipe() {
        const model = gemini.getGenerativeModel({ model: 'gemini-pro' });
        const result = await model.generateContent('Give me a food recipe using some or all the following ingredients: Apples, Sugar, Oatmeal, Butter.');
        return result.response.text();
    }
};
exports.ExampleService = ExampleService;
exports.ExampleService = ExampleService = __decorate([
    (0, common_1.Injectable)()
], ExampleService);
//# sourceMappingURL=example.service.js.map