import { PrismaClient } from '@prisma/client';
import { Logger } from 'pino';

export async function addWordBank(prisma: PrismaClient, logger: Logger) {
    const languageCode = 'en'

    try {
        await prisma.wordBank.upsert({
            where: { name: languageCode },
            update: {},
            create: {
                name: languageCode,
                Language: { connect: { code: languageCode } },
            }
        });

        logger.debug(`Added/updated word bank for language: ${languageCode}`);
    } catch (error) {
        logger.error(`Failed to add/update word bank for language: ${languageCode}`, { error });
    }
}
