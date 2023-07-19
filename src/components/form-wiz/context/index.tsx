import { FieldValues } from "react-hook-form";
import FormContextProvider, {
  type FormContextProviderProps,
} from "./form-context-provider";
import WizContextProvider, {
  type WizContextProviderProps,
} from "./wiz-context-provider";

export interface FormWizContextProviderProps<T extends FieldValues>
  extends FormContextProviderProps<T>,
    WizContextProviderProps {}

function FormWizContextProvider<T extends FieldValues>(
  props: FormWizContextProviderProps<T>
) {
  return (
    <FormContextProvider schema={props.schema} defaults={props.defaults}>
      <WizContextProvider onSubmit={props.onSubmit} steps={props.steps}>
        {props.children}
      </WizContextProvider>
    </FormContextProvider>
  );
}

export default FormWizContextProvider;
