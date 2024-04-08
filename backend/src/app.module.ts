import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';
import { RecipeModule } from './recipe/recipe.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ExampleModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
