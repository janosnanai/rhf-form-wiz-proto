import TextInput from "../_inputs/text-input";
import createNestingPrefix from "../../../utils/create-nesting-prefix";

interface NameFormProps {
  nesting?: string[];
}

function NameForm(props: NameFormProps) {
  const nestingPrefix = createNestingPrefix(props.nesting);
  return (
    <>
      <TextInput name={nestingPrefix + "firstName"} label="first name" />
      <TextInput name={nestingPrefix + "lastName"} label="last name" />
    </>
  );
}

export default NameForm;
