"use client";

import { useEffect, useState } from "react";
import CountdownLib from "react-countdown";
import "../ui/themes/Countdown.css";

type CountdownProps = {
  date: Date | number | string;
  variant?: "default" | "compact" | "hero";
  className?: string;
  completedText?: string;
};

export function Countdown({
  date,
  variant = "default",
  className = "",
  completedText = "Zeit erreicht",
}: CountdownProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`countdown countdown--${variant} ${className}`.trim()}
        aria-label="Countdown lädt"
        aria-busy="true"
      >
        <div className="countdown__segment">
          <span className="countdown__value">--</span>
          <span className="countdown__label">Tage</span>
        </div>
        <div className="countdown__segment">
          <span className="countdown__value">--</span>
          <span className="countdown__label">Std</span>
        </div>
        <div className="countdown__segment">
          <span className="countdown__value">--</span>
          <span className="countdown__label">Min</span>
        </div>
        <div className="countdown__segment">
          <span className="countdown__value">--</span>
          <span className="countdown__label">Sek</span>
        </div>
      </div>
    );
  }

  return (
    <CountdownLib
      date={date}
      autoStart
      renderer={({ completed, formatted }) => {
        if (completed) {
          return (
            <div
              className={`countdown countdown--${variant} ${className}`.trim()}
              data-completed="true"
              aria-live="polite"
            >
              <span className="countdown__completed">{completedText}</span>
            </div>
          );
        }

        return (
          <div
            className={`countdown countdown--${variant} ${className}`.trim()}
            aria-label="Verbleibende Zeit"
            aria-live="polite"
          >
            <div className="countdown__segment">
              <span className="countdown__value">{formatted.days}</span>
              <span className="countdown__label">Tage</span>
            </div>

            <div className="countdown__segment">
              <span className="countdown__value">{formatted.hours}</span>
              <span className="countdown__label">Std</span>
            </div>

            <div className="countdown__segment">
              <span className="countdown__value">{formatted.minutes}</span>
              <span className="countdown__label">Min</span>
            </div>

            <div className="countdown__segment">
              <span className="countdown__value">{formatted.seconds}</span>
              <span className="countdown__label">Sek</span>
            </div>
          </div>
        );
      }}
    />
  );
}