import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ExampleService } from './example.service';
import { CreateExampleDto } from './dto/create-example.dto';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  getExample(@Query('id') id: string, @Body() body: CreateExampleDto) {
    return {
      name: body.name,
      type: body.type,
      id: id,
    };
  }
}
