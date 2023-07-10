import { ZodSchema, z } from "zod";

function makeNestedZodSchema(schema: ZodSchema, nesting?: string[]): ZodSchema {
  if (!nesting || nesting.length === 0) return schema;

  const newSchema = z.object({ [nesting.pop() as string]: schema });

  return makeNestedZodSchema(newSchema, nesting);
}

export default makeNestedZodSchema;
