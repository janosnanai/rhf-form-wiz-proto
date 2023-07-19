import { useFormContext } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Portal } from "@mui/material";

/** only works inside a form context */
function FormDevTool() {
  const { control } = useFormContext();

  return (
    <Portal>
      <DevTool control={control} />
    </Portal>
  );
}

export default FormDevTool;
