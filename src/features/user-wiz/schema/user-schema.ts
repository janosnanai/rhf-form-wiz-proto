import { z } from "zod";
import { nameSchema } from "../../../components/forms/name-form/schema/name-schema";
import { contactSchema } from "../../../components/forms/contact-form/schema/contact-schema";

export const userSchema = nameSchema.merge(contactSchema);

export type UserInput = z.infer<typeof userSchema>;
