import { and, eq, sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import db from './index';
const user = sqliteTable('users', {
   id: integer('id').primaryKey(),
   name: text('name'),
   email: text('email'),
   password: text('password'),
});

const login = async (email: string, password: string) => {
   const result = await db
      .select()
      .from(user)
      .where(and(eq(user.email, email), eq(user.password, password)))
      .limit(1);
   if (result.length === 0) throw new Error('User not found');
   return result[0];
};
const users = async (tenant?: number) => {
   const table = tenant ? `users_${tenant.toString()}` : 'users';
   const users = await db
      .select()
      .from(
         sqliteTable(table, {
            id: integer('id').primaryKey(),
            name: text('name'),
            email: text('email'),
            password: text('password'),
         })
      )
      .all();
   return users;
};
const insertUser = async (
   tenant: number,
   name: string,
   email: string,
   password: string
) => {
   const table = tenant ? `users_${tenant.toString()}` : 'users';
   const result = await db
      .insert(
         sqliteTable(table, {
            id: integer('id').primaryKey(),
            name: text('name'),
            email: text('email'),
            password: text('password'),
         })
      )
      .values({ name, email, password });
   return result;
};
const findById = async (id: number) => {
   const result = await db.select().from(user).where(eq(user.id, id)).limit(1);
   if (result.length === 0) undefined;
   return result[0];
};
export default {
   model: user,
   login,
   users,
   findById,
   insertUser,
};
