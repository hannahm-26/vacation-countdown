"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateRangePicker } from "@/ui/DateRangePicker";
import { Form } from "./ui/Form";
import {
  ValidationSchema,
  ValidationSchemaType,
} from "./validation/DatePickerValidation";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useMemo } from "react";
import { ThemeChecker } from "@/theme/ThemeChecker";
import { ContentWrapper } from "@/ui/ContentWrapper";
import { CountDaysTiles } from "@/CountDaysTiles";

function countWorkingDays(startDate: Date, endDate: Date) {
  const cursor = new Date(startDate);
  let days = 0;

  while (cursor < endDate) {
    cursor.setDate(cursor.getDate() + 1);
    const day = cursor.getDay();
    const isWeekday = day !== 0 && day !== 6;
    if (isWeekday) days++;
  }

  return days ?? 0;
}

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      dateRange: {
        start: today(getLocalTimeZone()),
        end: parseDate("2026-09-06"),
      },
    },
  });
  const dateRange = useWatch({
    control,
    name: "dateRange",
  });
function countAllDays(startDate: Date, endDate: Date) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffInMs = end.getTime() - start.getTime();
  return Math.round(diffInMs / (1000 * 60 * 60 * 24));
}
  const workingDays = useMemo(() => {
    if (!dateRange?.start || !dateRange?.end) return null;

    const startDate = dateRange.start.toDate(getLocalTimeZone());
    const endDate = dateRange.end.toDate(getLocalTimeZone());

    return countWorkingDays(startDate, endDate);
  }, [dateRange]);

  const onSubmit = (values: ValidationSchemaType) => {
    console.log("submitted values", values);
    console.log("working days estimate:", workingDays);
  };
const allDays = useMemo(() => {
  if (!dateRange?.start || !dateRange?.end) return null;

  const startDate = dateRange.start.toDate(getLocalTimeZone());
  const endDate = dateRange.end.toDate(getLocalTimeZone());

  return countAllDays(startDate, endDate);
}, [dateRange]);

  return (
    <div>
      <main className="main">
        <ThemeChecker />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <ContentWrapper>
            <Controller
              control={control}
              name="dateRange"
              render={({ field }) => (
                <DateRangePicker
                  label="Date Range"
                  value={field.value}
                  onChange={field.onChange}
                  errorMessage={errors.dateRange?.message}
                />
              )}
            />
          </ContentWrapper>
        </Form>
        <div className="day-cards">
          <CountDaysTiles
            days={workingDays}
            subtitle="Weekends and holidays are excluded."
            title="Working Days"
          />
          <CountDaysTiles
            days={allDays}
            subtitle="All days calculated."
            title="All Days"
          />
        </div>
      </main>
    </div>
  );
}
