import { PrismaClient, Prisma } from '@prisma/client';
import { Logger } from 'pino';

export async function addLanguages(prisma: PrismaClient, logger: Logger) {
    const languageUpserts: Prisma.Prisma__LanguageClient<Prisma.LanguageUncheckedCreateInput>[] = Languages.map((language) => 
        prisma.language.upsert({
            where: { code: language.code },
            update: {},
            create: {
                id: language.id,
                name: language.name,
                code: language.code,
            },
        })
    );

    try {
        await prisma.$transaction(languageUpserts);
        logger.info('Languages have been added successfully.');
    } catch (error) {
        logger.error('Error while adding languages: ', error);
    }
}

export const Languages = [
    {
        id: '1',
        name: 'English',
        code: 'en',
    },
    {
        id: '2',
        name: 'French',
        code: 'fr',
    },
    {
        id: '3',
        name: 'Spanish',
        code: 'es',
    },
    {
        id: '4',
        name: 'German',
        code: 'de',
    },
    {
        id: '5',
        name: 'Italian',
        code: 'it',
    },
    {
        id: '6',
        name: 'Portuguese',
        code: 'pt',
    },
];
