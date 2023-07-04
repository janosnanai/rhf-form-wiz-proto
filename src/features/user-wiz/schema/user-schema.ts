import { z } from "zod";
import {
  nameSchema,
  nameDefaults,
} from "../../../components/forms/name-form/schema/name-schema";
import {
  contactSchema,
  contactDefaults,
} from "../../../components/forms/contact-form/schema/contact-schema";
import {
  notificationSchema,
  notificationDefaults,
} from "../../../components/forms/notification-form/schema/notification-schema";

export const userSchema = nameSchema
  .merge(contactSchema)
  .merge(notificationSchema);

export type UserInput = z.infer<typeof userSchema>;

export const userDefaults: UserInput = {
  ...nameDefaults,
  ...contactDefaults,
  ...notificationDefaults,
};
