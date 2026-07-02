"use client";

import {
  DateRangePicker as AriaDateRangePicker,
  Group,
  Popover,
  Dialog,
  type DateRangePickerProps as AriaDateRangePickerProps,
  type DateValue,
  type ValidationResult,
} from "react-aria-components";
import { ChevronDown } from "lucide-react";
import "@/ui/themes/index.css";
import { RangeCalendar } from "@/ui/RangeCalendar";
import { DateInput, DateSegment } from "@/ui/DateField";
import { Description, FieldButton, FieldError, Label } from "@/ui/Form";

export interface DateRangePickerProps<
  T extends DateValue,
> extends AriaDateRangePickerProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function DateRangePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  ...props
}: DateRangePickerProps<T>) {
  return (
    <AriaDateRangePicker {...props}>
      <Label>{label}</Label>

      <Group className="react-aria-Group inset">
        <div className="date-fields">
          <DateInput slot="start">
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>

          <span aria-hidden="true">–</span>

          <DateInput slot="end">
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
        </div>

        <FieldButton aria-label="Open calendar">
          <ChevronDown />
        </FieldButton>
      </Group>

      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>

      <Popover>
        <Dialog>
          <RangeCalendar />
        </Dialog>
      </Popover>
    </AriaDateRangePicker>
  );
}
