import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(): Promise<{
        id: string;
        name: string;
        password: string;
        email: string;
        clerkid: string;
    }>;
}
