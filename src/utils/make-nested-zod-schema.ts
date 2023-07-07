import { ZodSchema, z } from "zod";

function makeNestedZodSchema(schema: ZodSchema, nesting?: string[]): ZodSchema {
  if (!nesting) return schema;

  const formattedSchema = z.object({});

  for (let i = 0; i < nesting.length; i++) {
    formattedSchema.setKey(nesting[i], z.object({})); // TODO
  }

  return formattedSchema;
}
