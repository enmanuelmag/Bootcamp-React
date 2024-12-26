import { z } from 'zod';
import { UserSchema } from './user';

export const UserLoginSchema = UserSchema.pick({
  name: true,
}).extend({
  role: z.enum(['admin', 'user']),
});

export type UserLoginType = z.infer<typeof UserLoginSchema>;

export const ThemeSchema = z.object({
  schema: z.enum(['light', 'dark']),
  toggleSchema: z.function().returns(z.void()),
});

export type ThemeType = z.infer<typeof ThemeSchema>;
