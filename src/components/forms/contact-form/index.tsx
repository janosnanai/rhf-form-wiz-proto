import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

function ContactForm() {
  const { register } = useFormContext();

  return (
    <>
      <TextField type="email" label="email address" {...register("email")} />
      <TextField label="phone number" {...register("phone")} />
    </>
  );
}

export default ContactForm;
