import { z } from "zod";
import { nameSchema } from "../../../components/forms/name-form/schema/name-schema";
import { contactSchema } from "../../../components/forms/contact-form/schema/contact-schema";
import { notificationSchema } from "../../../components/forms/notification-form/schema/notification-schema";

export const userSchema = nameSchema
  .merge(contactSchema)
  .merge(notificationSchema);

export type UserInput = z.infer<typeof userSchema>;
