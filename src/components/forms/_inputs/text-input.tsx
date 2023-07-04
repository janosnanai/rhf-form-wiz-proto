import { type FieldError, useFormContext } from "react-hook-form";
import { TextField as MUITextField, Tooltip } from "@mui/material";

interface TextInputProps {
  name: string;
  label: string;
  type?: "text" | "email" | "date";
  disabled?: boolean;
  tooltip?: string;
}

function TextInput({
  name,
  label,
  type = "text",
  disabled = false,
  tooltip,
}: TextInputProps) {
  const {
    register,
    formState: { errors: validationErrors },
  } = useFormContext();

  // validation error might be nested, so let's un-nest it

  let vError;

  const nameArr = name.split(".") as (keyof typeof validationErrors)[];

  if (validationErrors[nameArr[0]]) {
    vError = {};
    vError = nameArr.reduce<object>(
      (acc, cur) => acc[cur as keyof typeof acc],
      validationErrors
    );
  }

  return (
    <Tooltip title={tooltip}>
      <MUITextField
        {...{ type, disabled, label }}
        {...register(name)}
        error={!!vError}
        helperText={(vError as FieldError)?.message}
        InputLabelProps={{ shrink: type === "date" ? true : undefined }}
      />
    </Tooltip>
  );
}

export default TextInput;
