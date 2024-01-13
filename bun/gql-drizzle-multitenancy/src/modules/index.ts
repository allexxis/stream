import { Context } from '@lib/context';
import { migrations, user } from '@lib/db';

export default {
   Query: {
      context: (_: any, __: any, ctx: Context) => {
         return ctx;
      },
      systemUsers: (_: any, __: any, ctx: Context) => {
         return user.users();
      },
      users: (_: any, __: any, ctx: Context) => {
         console.log(ctx);

         return user.users(ctx.user.id);
      },
   },
   Mutation: {
      populate: async () => {
         await migrations.populate();
         return true;
      },
      login: async (
         _: any,
         { email, password }: { email: string; password: string }
      ) => {
         const u = await user.login(email, password);
         return {
            user: u,
            token: 'Bearer $1',
         };
      },
      insertUser: async (
         _: any,
         {
            id,
            name,
            email,
            password,
         }: { id: number; name: string; email: string; password: string },
         ctx: Context
      ) => {
         await user.insertUser(ctx.user.id, name, email, password);
         return true;
      },
   },
};
