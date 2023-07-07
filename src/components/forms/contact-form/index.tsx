import TextInput from "../_inputs/text-input";

interface ContactFormProps {
  nesting?: string[];
}

function ContactForm(props: ContactFormProps) {
  let nestingPrefix = "";

  if (props.nesting) {
    nestingPrefix =
      props.nesting.join(".") + (props.nesting.length > 0 ? "" : ".");
  }

  return (
    <>
      <TextInput
        name={nestingPrefix + "email"}
        type="email"
        label="email address"
      />
      <TextInput name={nestingPrefix + "phone"} label="phone number" />
    </>
  );
}

export default ContactForm;
