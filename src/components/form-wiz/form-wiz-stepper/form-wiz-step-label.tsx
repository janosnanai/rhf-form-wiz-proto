import {
  Check as CheckIcon,
  ErrorOutline as ErrorIcon,
} from "@mui/icons-material";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";

import { type WizStep } from "../context/wiz-context";
import getZodKeys from "../../../utils/get-zod-keys";

interface FormWizStepProps {
  step: WizStep;
}

function FormWizStepLabel(props: FormWizStepProps) {
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const { getFieldState, formState } = useFormContext();

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

  return (
    <>
      {props.step.title}{" "}
      {isTouched && (isValid ? <CheckIcon /> : <ErrorIcon />)}
    </>
  );
}

export default FormWizStepLabel;
