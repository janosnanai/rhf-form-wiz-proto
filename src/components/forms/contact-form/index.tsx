import TextInput from "../_inputs/text-input";
import createNestingPrefix from "../../../utils/create-nesting-prefix";

interface ContactFormProps {
  nesting?: string[];
}

function ContactForm(props: ContactFormProps) {
  const nestingPrefix = createNestingPrefix(props.nesting);

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
