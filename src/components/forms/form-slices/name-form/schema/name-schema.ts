import { z } from "zod";

export const nameSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
});

export type NameInput = z.infer<typeof nameSchema>;

export const nameDefaults: NameInput = { firstName: "", lastName: "" };
