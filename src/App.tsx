import {
  Box,
  Button,
  Paper,
  Portal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  NavigateBefore as BackIcon,
  NavigateNext as NextIcon,
} from "@mui/icons-material";
import { DevTool } from "@hookform/devtools";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { useState } from "react";

function App() {
  const [wizStage, setWizStage] = useState(0);
  const formMethods = useForm();

  function handleBack() {
    if (wizStage === 0) return;
    setWizStage((prev) => prev - 1);
  }

  function handleNext() {
    if (wizStage === 2) return;
    setWizStage((prev) => prev + 1);
  }

  return (
    <>
      <Portal>
        <DevTool control={formMethods.control} />
      </Portal>
      <Paper sx={{ m: "5rem auto", my: 5, p: 3, width: 500 }}>
        <Box
          sx={{
            display: "flex",
            gap: 3,
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          <FormProvider {...formMethods}>
            <Button disabled={wizStage === 0} onClick={handleBack}>
              <BackIcon /> back
            </Button>

            {wizStage === 0 && <Form1 />}
            {wizStage === 1 && <Form2 />}
            {wizStage === 2 && <Summary />}

            <Button disabled={wizStage === 2} onClick={handleNext}>
              next <NextIcon />
            </Button>
          </FormProvider>
        </Box>
      </Paper>
    </>
  );
}

export default App;

function Form1() {
  const { register } = useFormContext();

  return (
    <Stack gap={3}>
      <Typography variant="h2" sx={{ textAlign: "center", mb: 3 }}>
        form 1
      </Typography>
      <TextField label="field A in form-1" {...register("form1.A")} />
      <TextField label="field B in form-1" {...register("form1.B")} />
    </Stack>
  );
}

function Form2() {
  const { register } = useFormContext();

  return (
    <Stack gap={3}>
      <Typography variant="h2" sx={{ textAlign: "center", mb: 3 }}>
        form 2
      </Typography>
      <TextField label="field A in form-2" {...register("form2.A")} />
      <TextField label="field B in form-2" {...register("form2.B")} />
    </Stack>
  );
}

function Summary() {
  const { getValues, handleSubmit } = useFormContext();

  return (
    <Stack gap={3}>
      <Typography variant="h2" sx={{ textAlign: "center", mb: 3 }}>
        Summary
      </Typography>
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
    </Stack>
  );
}
