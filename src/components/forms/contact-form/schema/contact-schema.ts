import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email().nullable(),
  phone: z.string().regex(/^d*/).min(7).nullable(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const contactDefaults: ContactInput = { email: null, phone: null };
