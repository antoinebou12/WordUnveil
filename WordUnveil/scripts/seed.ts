import { db } from 'api/src/lib/db';
import { logger } from 'api/src/lib/logger';

import addUsers from 'users';
import addLanguages from './languages';
import addWordBanks from './wordBanks';
import addWords from './words';

async function executeDatabaseTask(task, ...params) {
  try {
    await task(...params);
    logger.info(`${task.name} completed successfully.`);
  } catch (err) {
    logger.error(`${task.name} failed with error: `, err);
    throw err;
  }
}

export default async function main() {
  try {
    await executeDatabaseTask(addLanguages, db, logger);
    await executeDatabaseTask(addUsers, db, logger);
    await executeDatabaseTask(addWordBanks, db, logger);
    await executeDatabaseTask(addWords, db, logger);
    logger.info('All tasks completed successfully.');
  } catch (err) {
    logger.error('An error occurred during database setup: ', err);
    db.$disconnect();
    process.exit(1);
  }
}
