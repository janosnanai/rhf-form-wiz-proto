import { useState } from "react";

import { WizContext, type WizContextValues, type WizStep } from "./wiz-context";
import makeNestedZodSchema from "../../../utils/make-nested-zod-schema";

export interface WizStepWithNesting extends WizStep {
  nesting?: string[];
}

export interface WizContextProviderProps
  extends Pick<WizContextValues, "onSubmit"> {
  children: React.ReactNode;
  steps: WizStepWithNesting[];
}

function WizContextProvider(props: WizContextProviderProps) {
  const maxStep = props.steps.length - 1;

  const [activeStep, setActiveStep] = useState(0);

  const nestedSteps = props.steps.map((step) => {
    const nestedSchema = step.schema
      ? makeNestedZodSchema(step.schema)
      : undefined;

    return {
      component: step.component,
      title: step.title,
      schema: nestedSchema,
    } as WizStep;
  });

  function back() {
    if (activeStep === 0) return;
    setActiveStep((prev) => prev - 1);
  }

  function next() {
    if (activeStep >= maxStep) return;
    setActiveStep((prev) => prev + 1);
  }

  function stepTo(update: number) {
    if (update >= maxStep || update < 0) return;
    setActiveStep(update);
  }

  return (
    <WizContext.Provider
      value={{
        activeStep,
        back,
        next,
        stepTo,
        onSubmit: props.onSubmit,
        steps: nestedSteps,
      }}
    >
      {props.children}
    </WizContext.Provider>
  );
}

export default WizContextProvider;
