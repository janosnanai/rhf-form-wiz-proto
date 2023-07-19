import type { ZodSchema } from "zod";

import { createContext, useContext } from "react";

interface WizStepComponentProps {
  nesting?: string[];
}
export interface WizStep {
  title: string;
  nesting?: string[];
  component: React.FC<WizStepComponentProps>;
  schema?: ZodSchema;
}

export interface WizContextValues {
  activeStep: number;
  back: () => void;
  next: () => void;
  stepTo: (update: number) => void;
  onSubmit: () => void;
  steps: WizStep[];
}

export const WizContext = createContext<WizContextValues | null>(null);

export const useWizContext = () => useContext(WizContext) as WizContextValues;
