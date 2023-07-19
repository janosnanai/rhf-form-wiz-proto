import FormWiz from "../../components/form-wiz";
import { type WizStep } from "../../components/form-wiz/context/wiz-context";
import ContactForm from "../../components/forms/form-slices/contact-form";
import { contactSchema } from "../../components/forms/form-slices/contact-form/schema/contact-schema";
import NameForm from "../../components/forms/form-slices/name-form";
import { nameSchema } from "../../components/forms/form-slices/name-form/schema/name-schema";
import NotificationForm from "../../components/forms/form-slices/notification-form";
import { notificationSchema } from "../../components/forms/form-slices/notification-form/schema/notification-schema";
import Summary from "../../components/forms/form-slices/summary";
import { userDefaults, userSchema, type UserInput } from "./schema/user-schema";

const userWizSteps: WizStep[] = [
  {
    title: "name",
    nesting: ["user", "baseData"],
    component: NameForm,
    schema: nameSchema,
  },
  {
    title: "contact info",
    nesting: ["user", "baseData"],
    component: ContactForm,
    schema: contactSchema,
  },
  {
    title: "notificaion settings",
    nesting: ["user", "baseData"],
    component: NotificationForm,
    schema: notificationSchema,
  },
  { title: "summary", component: Summary },
];

interface UserWizProps {
  onSubmit?: () => void;
}

function UserWiz(props: UserWizProps) {
  function handleSubmit() {
    if (props.onSubmit) {
      props.onSubmit();
    }
  }

  return (
    <FormWiz<UserInput>
      onSubmit={handleSubmit}
      schema={userSchema}
      defaults={userDefaults}
      steps={userWizSteps}
    />
  );
}

export default UserWiz;
