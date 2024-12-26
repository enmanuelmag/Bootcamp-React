import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string(),
  url: z.string(),
  verified: z.boolean().optional(),
});

export type UserType = z.infer<typeof UserSchema>;

export const UserLoaderDataSchema = z.object({
  users: z.array(UserSchema),
});

export type UserLoaderDataType = z.infer<typeof UserLoaderDataSchema>;
