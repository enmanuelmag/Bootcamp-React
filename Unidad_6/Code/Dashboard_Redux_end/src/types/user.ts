import z from 'zod';

export const UserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  city: z.string().min(3, 'City must be at least 3 characters long'),
  age: z.number().positive().int().min(18, 'Age must be at least 18 years old'),
  verified: z.boolean(),
  url: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const UserCreateSchema = UserSchema.omit({ url: true });

export type UserCreate = z.infer<typeof UserCreateSchema>;

export const UserLoaderDataSchema = z.object({
  users: z.array(UserSchema),
});

export type UserLoaderData = z.infer<typeof UserLoaderDataSchema>;

export const UserByIndexLoaderDataSchema = z.object({
  user: UserSchema,
});

export type UserByIndexLoaderData = z.infer<typeof UserByIndexLoaderDataSchema>;
