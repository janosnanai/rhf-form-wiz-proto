import { z } from "zod";

export const nameSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export type NameInput = z.infer<typeof nameSchema>;
