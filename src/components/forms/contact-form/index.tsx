import TextInput from "../_inputs/text-input";

function ContactForm() {
  return (
    <>
      <TextInput name="email" type="email" label="email address" />
      <TextInput name="phone" label="phone number" />
    </>
  );
}

export default ContactForm;
