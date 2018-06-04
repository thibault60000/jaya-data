import '../setup.local';
import Sequelize from '../src/db';
import { setUpDatabase } from '../src/utils/database';

console.log(`=> Trying to sync the database (${process.env.DB_NAME}) with new models`);
console.log('==============================================');
console.log('');

setUpDatabase(Sequelize, true)
  .then(({ orm }) => orm.sync())
  .then(() => {
    console.log('=> Sync done.');
    process.exit(0);
  })
  .catch((e) => {
    console.error('/!\\ Cannot perform sync operation :(...');
    if (e) {
      console.error(e.message);
    }
    process.exit(1);
  });
