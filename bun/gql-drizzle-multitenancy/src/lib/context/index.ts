import { Request, Response } from 'express';
import { user } from '@lib/db';

export interface User {
   id: number;
   name: string;
   email: string;
}
export interface Context {
   user: User;
}

const getContext = async (
   req: Request,
   res: Response
): Promise<Context | undefined> => {
   try {
      const token = req.headers.authorization?.split(' ')[1].split('$')[1];
      if (token === undefined) return undefined;
      const u = await user.findById(parseInt(token as string));
      if (u === undefined) return undefined;
      return {
         user: {
            id: u.id,
            name: u.name as string,
            email: u.email as string,
         },
      };
   } catch (error) {
      console.log('Check authorization headers', error);
   }
};
export default getContext;
