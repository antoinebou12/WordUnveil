import { PrismaClient, Prisma } from "@prisma/client";
import { Logger } from "pino";
import CryptoJS from 'crypto-js';

const hashPassword = (password, salt, keySize, iterations) => {
    return CryptoJS.PBKDF2(password, salt, { keySize, iterations }).toString();
}

export async function addUsers(prisma: PrismaClient, logger: Logger) {
    const userUpserts: Prisma.Prisma__UserClient<Prisma.UserUncheckedCreateInput>[] = Users.map((user) => {
        const salt = CryptoJS.lib.WordArray.random(parseInt(process.env.SALT_LENGTH)).toString()
        const hashedPassword = hashPassword(user.password, salt, parseInt(process.env.KEY_SIZE), parseInt(process.env.ITERATIONS))
        return prisma.user.upsert(
            {
                where: {
                    username: user.username,
                },
                update: {},
                create: {
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    roles: user.roles,
                    hashedPassword: hashedPassword,
                    salt: salt,
                    userSetting: {
                        create: {
                            Language: {
                                connect: {
                                    code: "en",
                                },
                            },
                        },
                    },
                },
            }
        );
    });

    try {
        await prisma.$transaction(userUpserts);
        logger.info('Users have been added successfully.');
    } catch (error) {
        logger.error('Error while adding users: ', error);
    }
}

export const Users = [
    {
        username: "admin",
        name: "Admin",
        email: "admin@admin.com",
        password: "admin",
        roles: "admin",
    },
    {
        username: "user",
        name: "User",
        email: "user@user.com",
        password: "user",
        roles: "user",
    },
];
