import { Box, Stepper } from "@mui/material";

import { useWizContext } from "../context/wiz-context";
import FormWizStep from "./form-wiz-step";

function FormWizStepper() {
  const { activeStep, steps } = useWizContext();

  return (
    <Box>
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
        {steps.map((step, idx) => (
          <FormWizStep step={step} idx={idx} />
        ))}
      </Stepper>
    </Box>
  );
}

export default FormWizStepper;
