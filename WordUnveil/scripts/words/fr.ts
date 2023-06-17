import { PrismaClient } from '@prisma/client';
import { Logger } from 'pino';
import { WordsFR } from '../data/fr';

const languageCode = 'fr';

export async function addWords(db: PrismaClient, logger: Logger) {
    const promises = WordsFR.map((word) =>
        db.word.upsert({
            where: {
                word: word,
            },
            update: {},
            create: {
                word: word,
                definition: "",
                source: "",
                example: "",
                synonym: "",
                size: word.length,
                Language: {
                    connect: {
                        code: languageCode
                    }
                },
                WordBank: {
                    connect: {
                        name: languageCode
                    }
                }
            }
        })
        .then(() => logger.debug(`Added word ${word}`))
        .catch((error) => logger.error(`Failed to add word ${word}`, error))
    );
    await Promise.all(promises);
}
