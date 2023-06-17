import { PrismaClient } from '@prisma/client';
import { Logger } from 'pino';

export async function addWordBank(prisma: PrismaClient, logger: Logger) {
    const languageCode = 'fr';

    try {
        const wordBankResult = await prisma.wordBank.upsert({
            where: { name: languageCode },
            update: {},
            create: {
                name: languageCode,
                Language: { connect: { code: languageCode } },
            }
        });

        logger.debug({ wordBankResult }, `Successfully upserted word bank for language: ${languageCode}`);
    } catch (error) {
        logger.error(`Failed to upsert word bank for language: ${languageCode}`, error);
    }
}
