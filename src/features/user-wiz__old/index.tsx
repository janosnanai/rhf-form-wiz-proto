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
  Check as CheckIcon,
  ErrorOutline as ErrorIcon,
  NavigateBefore as BackIcon,
  NavigateNext as NextIcon,
} from "@mui/icons-material";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { useState } from "react";

import NameForm from "../../components/forms/form-slices/name-form";
import ContactForm from "../../components/forms/form-slices/contact-form";
import NotificationForm from "../../components/forms/form-slices/notification-form";
import Summary from "../../components/forms/form-slices/summary";
import { userSchema, type UserInput, userDefaults } from "./schema/user-schema";
import useValidateFormSlice from "../../hooks/use-validate-form-slice";
import { nameSchema } from "../../components/forms/form-slices/name-form/schema/name-schema";
import { contactSchema } from "../../components/forms/form-slices/contact-form/schema/contact-schema";
import { notificationSchema } from "../../components/forms/form-slices/notification-form/schema/notification-schema";

function UserWiz() {
  const [wizStage, setWizStage] = useState(0);
  const formMethods = useForm<UserInput>({
    defaultValues: userDefaults,
    mode: "onTouched",
    resolver: zodResolver(userSchema),
  });

  const validateName = useValidateFormSlice(nameSchema, ["user", "baseData"]);
  const validateContact = useValidateFormSlice(contactSchema, [
    "user",
    "baseData",
  ]);
  const validateNotification = useValidateFormSlice(notificationSchema, [
    "user",
    "notificationSettings",
  ]);

  interface FormStep {
    name: string;
    nesting?: string[];
    touched?: boolean;
    error?: boolean;
    type: string;
    validate?: (data: { [k: string]: unknown }) => boolean;
  }

  const [steps, setSteps] = useState<FormStep[]>([
    {
      name: "name",
      nesting: ["user", "baseData"],
      touched: false,
      error: false,
      type: "form",
      validate: validateName,
    },
    {
      name: "contact",
      nesting: ["user", "baseData"],
      touched: false,
      error: false,
      type: "form",
      validate: validateContact,
    },
    {
      name: "notifications",
      nesting: ["user", "notificationSettings"],
      touched: false,
      error: false,
      type: "form",
      validate: validateNotification,
    },
    { name: "summary", type: "summary" },
  ]);

  function handleBack() {
    if (wizStage === 0) return;
    setWizStage((prev) => prev - 1);
    setSteps((prev) =>
      prev.map((step, idx) => {
        return idx === wizStage && step.type === "form"
          ? {
              ...step,
              touched: true,
              error: step.validate
                ? !step.validate(formMethods.getValues())
                : false,
            }
          : step;
      })
    );
  }

  function handleNext() {
    if (wizStage === 3) return;
    setWizStage((prev) => prev + 1);
    setSteps((prev) =>
      prev.map((step, idx) => {
        return idx === wizStage && step.type === "form"
          ? {
              ...step,
              touched: true,
              error: step.validate
                ? !step.validate(formMethods.getValues())
                : false,
            }
          : step;
      })
    );
  }

  function handleStepTo(update: number) {
    if (update === wizStage) return;
    setWizStage(update);
    setSteps((prev) =>
      prev.map((step, idx) => {
        return idx === wizStage && step.type === "form"
          ? {
              ...step,
              touched: true,
              error: step.validate
                ? !step.validate(formMethods.getValues())
                : false,
            }
          : step;
      })
    );
  }

  function handleReset() {
    formMethods.reset(userDefaults);
  }

  function handleSubmit() {
    formMethods.handleSubmit((formData) => {
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
                {steps.map(({ name, touched, error }, idx) => (
                  <Step key={name}>
                    <StepButton onClick={() => handleStepTo(idx)}>
                      {name}{" "}
                      {touched && (!error ? <CheckIcon /> : <ErrorIcon />)}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Box flexGrow={1}>
              <Typography variant="h3" component="h2" sx={{ mb: 3 }}>
                {steps[wizStage].name}
              </Typography>
              {wizStage === 0 && (
                <Stack gap={3}>
                  <NameForm nesting={["user", "baseData"]} />
                </Stack>
              )}
              {wizStage === 1 && (
                <Stack gap={3}>
                  <ContactForm nesting={["user", "baseData"]} />
                </Stack>
              )}
              {wizStage === 2 && (
                <Stack gap={3}>
                  <NotificationForm
                    nesting={["user", "notificationSettings"]}
                  />
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
