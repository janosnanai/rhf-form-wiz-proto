import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

function Summary() {
  const { getValues, handleSubmit } = useFormContext();

  return (
    <>
      <p>{JSON.stringify(getValues())}</p>
      <Button
        onClick={handleSubmit((formData) => {
          console.log(formData);
          alert(JSON.stringify(formData));
        })}
        variant="contained"
      >
        submit
      </Button>
    </>
  );
}

export default Summary;
