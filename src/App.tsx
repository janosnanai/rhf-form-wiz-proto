import {
  Box,
  Button,
  Paper,
  Portal,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import {
  NavigateBefore as BackIcon,
  NavigateNext as NextIcon,
} from "@mui/icons-material";
import { DevTool } from "@hookform/devtools";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

import NameForm from "./components/forms/name-form/name-form";
import ContactForm from "./components/forms/contact-form/contact-form";
import Summary from "./components/forms/summary";

function App() {
  const [wizStage, setWizStage] = useState(0);
  const formMethods = useForm();
  const steps = ["name", "contact", "summary"];

  function handleBack() {
    if (wizStage === 0) return;
    setWizStage((prev) => prev - 1);
  }

  function handleNext() {
    if (wizStage === 2) return;
    setWizStage((prev) => prev + 1);
  }

  function handleStep(update: number) {
    if (update === wizStage) return;
    setWizStage(update);
  }

  return (
    <>
      <Portal>
        <DevTool control={formMethods.control} />
      </Portal>
      <Paper sx={{ m: "5rem auto", my: 5, p: 3, width: 500 }}>
        <Box>
          <Stepper nonLinear activeStep={wizStage}>
            {steps.map((label, idx) => (
              <Step key={label}>
                <StepButton onClick={() => handleStep(idx)}>{label}</StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
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

            <Stack gap={3}>
              <Typography variant="h2" sx={{ textAlign: "center", mb: 3 }}>
                {steps[wizStage]}
              </Typography>
              {wizStage === 0 && <NameForm />}
              {wizStage === 1 && <ContactForm />}
              {wizStage === 2 && <Summary />}
            </Stack>

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
