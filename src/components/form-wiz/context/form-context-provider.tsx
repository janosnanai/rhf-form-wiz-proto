import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  FormProvider,
  type DeepPartial,
  type FieldValues,
} from "react-hook-form";
import { type ZodSchema } from "zod";

export interface FormContextProviderProps<T extends FieldValues> {
  schema: ZodSchema;
  defaults?: DeepPartial<T>;
  children: React.ReactNode;
}

function FormContextProvider<T extends FieldValues>(
  props: FormContextProviderProps<T>
) {
  const formMethods = useForm<T>({
    defaultValues: props.defaults,
    mode: "onTouched",
    resolver: zodResolver(props.schema),
  });
  return <FormProvider {...formMethods}>{props.children}</FormProvider>;
}

export default FormContextProvider;
