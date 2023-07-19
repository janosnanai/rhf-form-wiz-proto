import { useWizContext } from "./context/wiz-context";

function FormWizContent() {
  const { activeStep, steps } = useWizContext();
  const FormSlice = steps[activeStep].component;
  return <FormSlice nesting={steps[activeStep].nesting} />;
}

export default FormWizContent;
