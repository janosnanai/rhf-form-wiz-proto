import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useWizContext } from "../../form-wiz/context/wiz-context";

function Summary() {
  const { getValues, handleSubmit } = useFormContext();
  const { onSubmit } = useWizContext();

  const fields = getValues();

  return (
    <>
      <p>{JSON.stringify(fields)}</p>
      <Button
        onClick={handleSubmit((formData) => {
          console.log(formData);
          alert(JSON.stringify(formData));
          onSubmit();
        })}
        variant="contained"
      >
        submit
      </Button>
    </>
  );
}

export default Summary;
