import { z } from "zod";
import {
  nameSchema,
  nameDefaults,
} from "../../../components/forms/form-slices/name-form/schema/name-schema";
import {
  contactSchema,
  contactDefaults,
} from "../../../components/forms/form-slices/contact-form/schema/contact-schema";
import {
  notificationSchema,
  notificationDefaults,
} from "../../../components/forms/form-slices/notification-form/schema/notification-schema";

// export const userSchema = nameSchema
//   .merge(contactSchema)
//   .merge(notificationSchema);

export const userSchema = z.object({
  user: z.object({
    baseData: nameSchema.merge(contactSchema),
    notificationSettings: notificationSchema,
  }),
});

export type UserInput = z.infer<typeof userSchema>;

export const userDefaults: UserInput = {
  user: {
    baseData: { ...nameDefaults, ...contactDefaults },
    notificationSettings: { ...notificationDefaults },
  },
};
