import { type ZodSchema, z } from "zod";

function getZodLeafKeys(schema: ZodSchema): string[] {
  if (schema === null || schema === undefined) {
    return [];
  }

  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional) {
    return getZodLeafKeys(schema.unwrap());
  }

  if (schema instanceof z.ZodArray) return getZodLeafKeys(schema.element);

  if (schema instanceof z.ZodObject) {
    const entries = Object.entries(schema.shape);

    return entries.flatMap(([k, v]) => {
      const nestedValue =
        v instanceof z.ZodType
          ? getZodLeafKeys(v).map((nestedKey) => `${k}.${nestedKey}`)
          : null;

      return nestedValue && nestedValue.length ? nestedValue : k;
    });
  }

  return [];
}

export default getZodLeafKeys;
