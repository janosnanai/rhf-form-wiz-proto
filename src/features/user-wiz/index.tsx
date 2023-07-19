import FormWiz from "../../components/form-wiz";
import { WizStepWithNesting } from "../../components/form-wiz/context/wiz-context-provider";
import ContactForm from "../../components/forms/contact-form";
import { contactSchema } from "../../components/forms/contact-form/schema/contact-schema";
import NameForm from "../../components/forms/name-form";
import { nameSchema } from "../../components/forms/name-form/schema/name-schema";
import NotificationForm from "../../components/forms/notification-form";
import { notificationSchema } from "../../components/forms/notification-form/schema/notification-schema";
import Summary from "../../components/forms/summary";
import { userDefaults, userSchema, type UserInput } from "./schema/user-schema";

const userWizSteps: WizStepWithNesting[] = [
  {
    title: "name",
    nesting: ["user", "baseData"],
    component: <NameForm />,
    schema: nameSchema,
  },
  {
    title: "contact info",
    nesting: ["user", "baseData"],
    component: <ContactForm />,
    schema: contactSchema,
  },
  {
    title: "notificaion settings",
    nesting: ["user", "baseData"],
    component: <NotificationForm />,
    schema: notificationSchema,
  },
  { title: "summary", component: <Summary /> },
];

interface UserWizProps {
  onSubmit?: () => void;
}

function UserWiz(props: UserWizProps) {
  function handleSubmit() {
    if (props.onSubmit) {
      props.onSubmit();
    }
    alert("TODO");
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
