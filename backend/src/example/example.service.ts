import { Injectable } from '@nestjs/common';

@Injectable()
export class ExampleService {
  sayHello() {
    console.log('Hello World');
  }
}
