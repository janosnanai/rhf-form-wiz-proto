import { type ZodSchema } from "zod";

import { useCallback, useMemo } from "react";

import makeNestedZodSchema from "../utils/make-nested-zod-schema";

type ValidatorFn = (data: { [k: string]: unknown }) => boolean;

function useValidateFormSlice(
  schema: ZodSchema,
  nesting?: string[]
): ValidatorFn {
  const formattedSchema = useMemo(
    () => makeNestedZodSchema(schema, nesting),
    [schema, nesting]
  );

  const validator = useCallback(
    (data: { [k: string]: unknown }) => {
      const isValid = formattedSchema.safeParse(data).success;
      return isValid;
    },
    [formattedSchema]
  );

  return validator;
}

export default useValidateFormSlice;
