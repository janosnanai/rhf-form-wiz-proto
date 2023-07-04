import { Controller, useFormContext } from "react-hook-form";
import { Switch as MUISwitch, FormControlLabel, Tooltip } from "@mui/material";

interface SwitchProps {
  name: string;
  label: string;
  disabled?: boolean;
  tooltip?: string;
  type?: "num" | "bool";
}

function Switch({
  name,
  label,
  disabled = false,
  tooltip,
  type = "bool",
}: SwitchProps) {
  const { control } = useFormContext();

  const checkedVal = type === "bool" ? true : 1;
  const uncheckedVal = type === "bool" ? false : 0;

  return (
    <Tooltip title={tooltip}>
      <FormControlLabel
        label={label}
        disabled={disabled}
        control={
          <Controller
            {...{ name, control }}
            render={({ field }) => (
              <MUISwitch
                disabled={disabled}
                {...field}
                checked={!!field.value}
                onChange={(event) => {
                  field.onChange(
                    event.target.checked ? checkedVal : uncheckedVal
                  );
                }}
              />
            )}
          />
        }
      />
    </Tooltip>
  );
}

export default Switch;
