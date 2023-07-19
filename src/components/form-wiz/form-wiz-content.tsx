import { useWizContext } from "./context/wiz-context";

function FormWizContent() {
  const { activeStep, steps } = useWizContext();
  return <>{steps[activeStep].component}</>;
}

export default FormWizContent;
