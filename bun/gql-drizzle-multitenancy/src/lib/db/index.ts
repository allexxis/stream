import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { sql } from 'drizzle-orm';
const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);
import user from './user';
export const migrations = {
   populate: async () => {
      try {
         await db.run(
            sql`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,email TEXT, password TEXT)`
         );
         await db.run(
            sql`CREATE TABLE IF NOT EXISTS users_1 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,email TEXT, password TEXT)`
         );
      } catch (error: any) {
         console.log(error);
      }
      try {
         const users = await user.users();
         if (
            users.length === 0 ||
            users.find((user) => user.id === 1) === undefined
         ) {
            console.log('No users found. Populating database...');
            await db.insert(user.model).values({
               id: 1,
               name: 'Admin',
               email: 'admin@bun.io',
               password: 'admin',
            });
            const users = await db.select().from(user.model).all();
            console.log(users.find((user) => user.id === 1));
         } else {
            console.log(users.find((user) => user.id === 1));
            return;
         }
      } catch (error: any) {
         console.log(error.message);
      }
   },
};
export { user };
export default db;
