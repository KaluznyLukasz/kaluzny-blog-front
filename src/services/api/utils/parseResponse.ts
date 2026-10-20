import type { z } from "zod";
import { ApiError } from "./apiError";

export const parseResponse = <Schema extends z.ZodType>(
  schema: Schema,
  data: unknown,
): z.output<Schema> => {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ApiError(
      "invalid-response",
      "The API answer does not match the schema",
      { cause: result.error },
    );
  }

  return result.data;
};
