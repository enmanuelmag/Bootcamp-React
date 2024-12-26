import { z } from 'zod';

//Entities
export const UserSchema = z.object({
  name: z.string(),
  url: z.string(),
  verified: z.boolean().optional(),
});

export type UserType = z.infer<typeof UserSchema>;

//Loaders
export const UserLoaderDataSchema = z.object({
  users: z.array(UserSchema),
});

export type UserLoaderDataType = z.infer<typeof UserLoaderDataSchema>;

export const UserByIndexLoaderDataSchema = z.object({
  user: UserSchema,
});

export type UserByIndexLoaderDataType = z.infer<
  typeof UserByIndexLoaderDataSchema
>;
