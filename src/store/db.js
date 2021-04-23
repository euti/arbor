import Dexie from 'dexie';

const db = new Dexie("arbor_db");

db.version(1).stores({
    branches: '++id,name,parentId',
    leaves: '++id,branchId',
});

export default db;
