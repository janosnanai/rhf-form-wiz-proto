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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

import NameForm from "../../components/forms/name-form";
import ContactForm from "../../components/forms/contact-form";
import NotificationForm from "../../components/forms/notification-form";
import Summary from "../../components/forms/summary";
import { userSchema, type UserInput } from "./schema/user-schema";

function UserWiz() {
  const [wizStage, setWizStage] = useState(0);
  const formMethods = useForm<UserInput>({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
  });
  const steps = ["name", "contact", "notifications", "summary"];

  function handleBack() {
    if (wizStage === 0) return;
    setWizStage((prev) => prev - 1);
  }

  function handleNext() {
    if (wizStage === 3) return;
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
      <Paper sx={{ m: "5rem auto", my: 5, p: 3, width: 640 }}>
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
              {wizStage === 2 && <NotificationForm />}
              {wizStage === 3 && <Summary />}
            </Stack>

            <Button disabled={wizStage === 3} onClick={handleNext}>
              next <NextIcon />
            </Button>
          </FormProvider>
        </Box>
      </Paper>
    </>
  );
}

export default UserWiz;
