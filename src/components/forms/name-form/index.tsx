import TextInput from "../_inputs/text-input";

function NameForm() {
  return (
    <>
      <TextInput name="firstName" label="first name" />
      <TextInput name="lastName" label="last name" />
    </>
  );
}

export default NameForm;
