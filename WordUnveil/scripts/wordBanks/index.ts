import { PrismaClient } from '@prisma/client';
import { Logger } from 'pino';

import { addWordBank as addWordBankFR } from './fr';
import { addWordBank as addWordBankEN } from './en';
import { addWordBank as addWordBankES } from './es';

export default async function addWords(db: PrismaClient, logger: Logger) {
    await addWordBankFR(db, logger);
    await addWordBankEN(db, logger);
    await addWordBankES(db, logger);
}