import z from 'zod';

export const UserLoginSchema = z.object({
  name: z.string(),
  city: z.string(),
  email: z.string(),
  role: z.enum(['admin', 'saas-user', 'user']),
});

export type UserLogin = z.infer<typeof UserLoginSchema>;

export const ThemeSchema = z.object({
  schema: z.enum(['light', 'dark']),
});

export type Theme = z.infer<typeof ThemeSchema>;
