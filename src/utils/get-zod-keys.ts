import { type ZodSchema, z } from "zod";

function getZodKeys(schema: ZodSchema): string[] {
  if (schema === null || schema === undefined) {
    return [];
  }

  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional) {
    return getZodKeys(schema.unwrap());
  }

  if (schema instanceof z.ZodObject) {
    const entries = Object.entries(schema.shape);

    return entries.flatMap(([k, v]) => {
      const nestedValue =
        v instanceof z.ZodType
          ? getZodKeys(v).map((nestedKey) => `${k}.${nestedKey}`)
          : null;

      return nestedValue || k;
    });
  }

  return [];
}

export default getZodKeys;
