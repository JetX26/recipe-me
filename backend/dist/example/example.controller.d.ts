import { ExampleService } from './example.service';
import { CreateExampleDto } from './dto/create-example.dto';
export declare class ExampleController {
    private readonly exampleService;
    constructor(exampleService: ExampleService);
    test(): void;
    getExample(id: string, body: CreateExampleDto): {
        name: string;
        type: string;
        id: string;
    };
}
