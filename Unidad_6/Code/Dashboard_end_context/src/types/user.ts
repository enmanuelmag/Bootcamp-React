import { z } from 'zod';

//Entities
export const UserSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(255, 'Name must be at most 255 characters long'),
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
  user: UserSchema.optional(),
});

export type UserByIdLoaderDataType = z.infer<typeof UserByIdLoaderDataSchema>;

//Form
export const UserCreateSchema = UserSchema.omit({ id: true, url: true });

export type UserCreateType = z.infer<typeof UserCreateSchema>;
