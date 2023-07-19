import {
  Check as CheckIcon,
  ErrorOutline as ErrorIcon,
} from "@mui/icons-material";
import { useFormContext } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";

import { type WizStep } from "../context/wiz-context";
import getZodLeafKeys from "../../../utils/get-zod-leaf-keys";
import { type ZodSchema } from "zod";

interface FormWizStepProps {
  step: WizStep;
}

function FormWizStepLabel(props: FormWizStepProps) {
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const { getFieldState, formState } = useFormContext();

  const fieldKeys = useMemo(() => {
    let newFieldKeys: string[] | null = null;

    if (props.step.schema) {
      newFieldKeys = getZodLeafKeys(props.step.schema as ZodSchema);
      const { nesting } = props.step;
      if (nesting && nesting?.length) {
        newFieldKeys = newFieldKeys.map((k) => nesting.join(".") + "." + k);
      }
    }

    return newFieldKeys;
  }, [props.step]);

  useEffect(() => {
    if (fieldKeys !== null) {
      setIsValid(true);
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
      {props.step.title} {isTouched && isValid && <CheckIcon />}
      {!isValid && <ErrorIcon />}
    </>
  );
}

export default FormWizStepLabel;
