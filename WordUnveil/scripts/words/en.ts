import { PrismaClient } from '@prisma/client';
import { Logger } from 'pino';
import { WordsEN } from '../data/en';

const languageCode = 'en';

export async function addWords(db: PrismaClient, logger: Logger) {
    const promises = WordsEN.map((word) =>
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
