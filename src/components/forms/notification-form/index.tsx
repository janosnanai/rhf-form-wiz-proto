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
        label={nestingPrefix + "email notifications"}
        name="emailNotification"
      />
      <Switch
        label={nestingPrefix + "SMS notifications"}
        name="smsNotification"
      />
    </>
  );
}

export default NotificationForm;
