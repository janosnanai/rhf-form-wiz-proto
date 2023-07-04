// import { TextField } from "@mui/material";
// import { useFormContext } from "react-hook-form";

import TextInput from "../_inputs/text-input";

function ContactForm() {
  // const { register } = useFormContext();

  return (
    <>
      {/* <TextField type="email" label="email address" {...register("email")} /> */}
      <TextInput name="email" type="email" label="email address" />
      {/* <TextField label="phone number" {...register("phone")} /> */}
      <TextInput name="phone" label="phone number" />
    </>
  );
}

export default ContactForm;
