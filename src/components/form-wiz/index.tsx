import { Box } from "@mui/material";
import { type FieldValues } from "react-hook-form";

import FormWizContextProvider, {
  type FormWizContextProviderProps,
} from "./context";
import FormWizContent from "./form-wiz-content";
import FormWizStepper from "./form-wiz-stepper";
import FormWizActions from "./form-wiz-actions";

function FormWiz<T extends FieldValues>(
  props: Omit<FormWizContextProviderProps<T>, "children">
) {
  return (
    <FormWizContextProvider
      onSubmit={props.onSubmit}
      schema={props.schema}
      steps={props.steps}
      defaults={props.defaults}
    >
      <Box sx={{ display: "flex" }}>
        <FormWizStepper />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <FormWizContent />
          <FormWizActions />
        </Box>
      </Box>
    </FormWizContextProvider>
  );
}

export default FormWiz;
