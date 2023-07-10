import Switch from "../_inputs/switch";
import createNestingPrefix from "../../../utils/create-nesting-prefix";
interface NotificationFormProps {
  nesting?: string[];
}

function NotificationForm(props: NotificationFormProps) {
  const nestingPrefix = createNestingPrefix(props.nesting);

  return (
    <>
      <Switch
        name={nestingPrefix + "emailNotification"}
        label="email notifications"
      />
      <Switch
        name={nestingPrefix + "smsNotification"}
        label="SMS notifications"
      />
    </>
  );
}

export default NotificationForm;
