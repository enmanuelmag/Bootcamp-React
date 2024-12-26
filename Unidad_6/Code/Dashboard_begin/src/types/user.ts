import { z } from 'zod';

//Entities
export const UserSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(255, 'Name must be at most 255 characters long'),
  url: z.string(),
  age: z.number().positive().int(),
  city: z
    .string()
    .min(3, 'City must be at least 3 characters long')
    .max(255, 'City must be at most 255 characters long'),
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
