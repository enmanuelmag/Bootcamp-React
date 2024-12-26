import { z } from 'zod';

//Entities
export const UserSchema = z.object({
  name: z.string(),
  url: z.string(),
  age: z.number(),
  city: z.string(),
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

//Form
export const UserCreateSchema = UserSchema.omit({ url: true });

export type UserCreateType = z.infer<typeof UserCreateSchema>;
