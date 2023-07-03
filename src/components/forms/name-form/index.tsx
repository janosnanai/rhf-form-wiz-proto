// import { TextField } from "@mui/material";
// import { useFormContext } from "react-hook-form";

import TextInput from "../inputs/text-input";

function NameForm() {
  // const { register } = useFormContext();

  return (
    <>
      {/* <TextField label="first name" {...register("firstName")} /> */}
      <TextInput name="firstName" label="first name" />
      {/* <TextField label="last name" {...register("lastName")} /> */}
      <TextInput name="lastName" label="last name" />
    </>
  );
}

export default NameForm;
