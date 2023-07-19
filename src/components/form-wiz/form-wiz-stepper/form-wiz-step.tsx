import {
  Check as CheckIcon,
  ErrorOutline as ErrorIcon,
} from "@mui/icons-material";
import { Step, StepButton } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";

import { type WizStep, useWizContext } from "../context/wiz-context";
import getZodKeys from "../../../utils/get-zod-keys";

interface FormWizStepProps {
  step: WizStep;
  idx: number;
}

function FormWizStep(props: FormWizStepProps) {
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  const { activeStep, stepTo } = useWizContext();
  const { getFieldState, formState, trigger } = useFormContext();

  const fieldKeys = props.step.schema ? getZodKeys(props.step.schema) : null;

  useEffect(() => {
    if (fieldKeys !== null) {
      for (let i = 0; i < fieldKeys.length; i++) {
        if (getFieldState(fieldKeys[i]).isTouched) {
          setIsTouched(true);
        }
        if (getFieldState(fieldKeys[i]).error) {
          setIsValid(false);
        }
      }
    }
  }, [fieldKeys, getFieldState, formState]);

  async function handleStepTo(update: number) {
    if (activeStep === update) return;
    if (fieldKeys) {
      trigger(fieldKeys);
    }
    stepTo(update);
  }

  return (
    <Step>
      <StepButton onClick={() => handleStepTo(props.idx)}>
        {props.step.title}{" "}
        {isTouched && (isValid ? <CheckIcon /> : <ErrorIcon />)}
      </StepButton>
    </Step>
  );
}

export default FormWizStep;
