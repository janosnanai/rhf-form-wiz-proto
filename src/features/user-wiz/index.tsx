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
import { userSchema, type UserInput, userDefaults } from "./schema/user-schema";

function UserWiz() {
  const [wizStage, setWizStage] = useState(0);
  const formMethods = useForm<UserInput>({
    defaultValues: userDefaults,
    mode: "onTouched",
    resolver: zodResolver(userSchema),
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

  function handleReset() {
    formMethods.reset(userDefaults);
  }

  function handleSubmit() {
    console.log("hello");

    formMethods.handleSubmit((formData) => {
      console.log("submit called");

      console.log(formData);
      alert(JSON.stringify(formData));
    })();
  }

  return (
    <>
      <Portal>
        <DevTool control={formMethods.control} />
      </Portal>
      <Paper sx={{ m: "5rem auto", my: 5, p: 3, width: 640 }}>
        <FormProvider {...formMethods}>
          <Box
            sx={{
              display: "flex",
              gap: 7,
              mt: 3,
            }}
          >
            <Box>
              <Stepper nonLinear activeStep={wizStage} orientation="vertical">
                {steps.map((label, idx) => (
                  <Step key={label}>
                    <StepButton onClick={() => handleStep(idx)}>
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Box flexGrow={1}>
              <Typography variant="h3" component="h2" sx={{ mb: 3 }}>
                {steps[wizStage]}
              </Typography>
              {wizStage === 0 && (
                <Stack gap={3}>
                  <NameForm />
                </Stack>
              )}
              {wizStage === 1 && (
                <Stack gap={3}>
                  <ContactForm />
                </Stack>
              )}
              {wizStage === 2 && (
                <Stack gap={3}>
                  <NotificationForm />
                </Stack>
              )}
              {wizStage === 3 && <Summary />}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button disabled={wizStage === 0} onClick={handleBack}>
                  <BackIcon /> back
                </Button>
                <Button disabled={wizStage === 3} onClick={handleNext}>
                  next <NextIcon />
                </Button>
              </Box>
            </Box>
          </Box>
        </FormProvider>
      </Paper>
      <Box sx={{ mt: 3 }}>
        <Button onClick={handleReset}>reset form</Button>
        <Button onClick={handleSubmit}>submit</Button>
      </Box>
      <p>{JSON.stringify(formMethods.formState)}</p>
    </>
  );
}

export default UserWiz;
