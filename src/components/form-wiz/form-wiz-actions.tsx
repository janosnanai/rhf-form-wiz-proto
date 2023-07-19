import {
  NavigateBefore as BackIcon,
  NavigateNext as NextIcon,
} from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { type ZodSchema } from "zod";
import { useFormContext } from "react-hook-form";

import { useWizContext } from "./context/wiz-context";
import getZodKeys from "../../utils/get-zod-leaf-keys";

function FormWizActions() {
  const { activeStep, steps, back, next } = useWizContext();
  const { trigger } = useFormContext();

  const maxStep = steps.length - 1;

  const fieldKeys = steps[activeStep].schema
    ? getZodKeys(steps[activeStep].schema as ZodSchema)
    : null;

  function handleBack() {
    if (fieldKeys) {
      trigger(fieldKeys);
    }
    back();
  }

  function handleNext() {
    if (fieldKeys) {
      trigger(fieldKeys);
    }
    next();
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
      <Button disabled={activeStep === 0} onClick={handleBack}>
        <BackIcon /> back
      </Button>
      <Button disabled={activeStep >= maxStep} onClick={handleNext}>
        next <NextIcon />
      </Button>
    </Box>
  );
}

export default FormWizActions;
