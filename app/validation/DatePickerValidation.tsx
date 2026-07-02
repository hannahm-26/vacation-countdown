import { z } from "zod";
import type { DateValue } from "@internationalized/date";
import type { RangeValue } from "@react-types/shared";

export const ValidationSchema = z.object({
  dateRange: z.custom<RangeValue<DateValue>>((value) => {
    return (
      !!value && typeof value === "object" && "start" in value && "end" in value
    );
  }, "Date range is required"),
});

export type ValidationSchemaType = z.infer<typeof ValidationSchema>;
