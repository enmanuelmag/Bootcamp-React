import { z } from 'zod';

//Entities
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  verified: z.boolean().optional(),
  role: z.enum(['admin', 'user']),
  birthday: z.number(),
});

export type UserType = z.infer<typeof UserSchema>;

//Loaders
export const UserLoaderDataSchema = z.object({
  users: z.array(UserSchema),
});

export type UserLoaderDataType = z.infer<typeof UserLoaderDataSchema>;

export const UserByIdLoaderDataSchema = z.object({
  user: UserSchema,
});

export type UserByIdLoaderDataType = z.infer<typeof UserByIdLoaderDataSchema>;
