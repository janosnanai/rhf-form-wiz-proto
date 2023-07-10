import { z } from "zod";

export const notificationSchema = z.object({
  emailNotification: z.boolean(),
  smsNotification: z.boolean(),
});

export type NotificationInput = z.infer<typeof notificationSchema>;

export const notificationDefaults: NotificationInput = {
  emailNotification: false,
  smsNotification: false,
};
