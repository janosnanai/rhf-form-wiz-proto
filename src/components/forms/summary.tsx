import { Button } from "@mui/material";
import { useFormContext } from "react-hook-form";

function Summary() {
  const { getValues, handleSubmit } = useFormContext();
  const fields = getValues();
  return (
    <>
      {/* {Object.entries(fields).map(([k, v]) => (
        <p key={k}>
          <strong>{k}</strong>: {v}
        </p>
      ))} */}

      <p>{JSON.stringify(fields)}</p>
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
