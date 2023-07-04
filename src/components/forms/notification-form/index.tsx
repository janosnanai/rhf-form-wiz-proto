import Switch from "../_inputs/switch";

function NotificationForm() {
  return (
    <>
      <Switch label="email notifications" name="emailNotification" />
      <Switch label="SMS notifications" name="smsNotification" />
    </>
  );
}

export default NotificationForm;
