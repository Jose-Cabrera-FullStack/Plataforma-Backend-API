// set DEBUG=app:*& npm run-script seedMovies.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:users');
const MongoLib = require('../../lib/mongo');
const { usersMock } = require('../../utils/mocks/users');

async function seedusers() {
  try {
    const mongoDB = new MongoLib();

    const promises = usersMock.map(async user => {
      await mongoDB.create('users', user);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} users have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedusers();
