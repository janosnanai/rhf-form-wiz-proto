import { Box, Step, StepButton, Stepper } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { type ZodSchema } from "zod";

import { useWizContext } from "../context/wiz-context";
import getZodLeafKeys from "../../../utils/get-zod-leaf-keys";
import FormWizStepLabel from "./form-wiz-step-label";

function FormWizStepper() {
  const { activeStep, steps, stepTo } = useWizContext();
  const { trigger } = useFormContext();

  function handleStepTo(update: number) {
    if (activeStep === update) return;

    let fieldKeys: string[] | null = null;

    if (steps[activeStep].schema) {
      fieldKeys = getZodLeafKeys(steps[activeStep].schema as ZodSchema);
      const { nesting } = steps[activeStep];
      if (nesting && nesting?.length) {
        fieldKeys = fieldKeys.map((k) => nesting.join(".") + "." + k);
      }
    }

    if (fieldKeys) {
      trigger(fieldKeys);
    }
    stepTo(update);
  }

  return (
    <Box>
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
        {steps.map((step, idx) => (
          <Step key={step.title}>
            <StepButton onClick={() => handleStepTo(idx)}>
              <FormWizStepLabel step={step} />
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default FormWizStepper;
