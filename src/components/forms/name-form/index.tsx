import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

function NameForm() {
  const { register } = useFormContext();

  return (
    <>
      <TextField label="first name" {...register("firstName")} />
      <TextField label="last name" {...register("lastName")} />
    </>
  );
}

export default NameForm;
