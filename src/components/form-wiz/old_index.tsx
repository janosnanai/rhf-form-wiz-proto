import { Box, Portal, Step, StepButton, Stepper } from "@mui/material";
import {
  Check as CheckIcon,
  ErrorOutline as ErrorIcon,
  NavigateBefore as BackIcon,
  NavigateNext as NextIcon,
} from "@mui/icons-material";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  FormProvider,
  type DeepPartial,
  type FieldValues,
} from "react-hook-form";
import { useState } from "react";
import { type ZodSchema } from "zod";

import { type WizContextValues, useWizContext } from "./context/wiz-context";

interface FormStep {
  title: string;
  nesting?: string[];
  // touched?: boolean;
  // error?: boolean;
  // type: string;
  // validate?: (data: { [k: string]: unknown }) => boolean;
  component: React.ReactNode;
  schema: ZodSchema;
}

interface FormWizProps<T extends FieldValues> {
  steps: FormStep[];
  schema: ZodSchema;
  defaults?: DeepPartial<T>;
  onSubmit: () => void;
}

function FormWiz<T extends FieldValues>(props: FormWizProps<T>) {
  const maxStep = props.steps.length - 1;
  const [wizStep, setWizStep] = useState(0);
  const { stepTo } = useWizContext() as WizContextValues;

  const formMethods = useForm<T>({
    defaultValues: props.defaults,
    mode: "onTouched",
    resolver: zodResolver(props.schema),
  });

  return (
    <>
      <Portal>
        <DevTool control={formMethods.control} />
      </Portal>
      <FormProvider {...formMethods}>
        <Box>
          <Box>
            <Stepper nonLinear activeStep={wizStep} orientation="vertical">
              {props.steps.map((step, idx) => (
                <Step key={step.title}>
                  <StepButton onClick={() => stepTo(idx)}>
                    {step.title}{" "}
                    {step.touched &&
                      (!step.error ? <CheckIcon /> : <ErrorIcon />)}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Box>
          <Box>{props.steps[wizStep].component}</Box>
        </Box>
      </FormProvider>
    </>
  );
}

export default FormWiz;
