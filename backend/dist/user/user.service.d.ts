import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    createUser(): Promise<{
        id: string;
        name: string;
        password: string;
        email: string;
        clerkid: string;
    }>;
}
