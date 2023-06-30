import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/d*/).min(7),
});

export type ContactInput = z.infer<typeof contactSchema>;
