import { z } from "zod";

export const nameSchema = z.object({
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
});

export type NameInput = z.infer<typeof nameSchema>;

export const nameDefaults: NameInput = { firstName: null, lastName: null };
