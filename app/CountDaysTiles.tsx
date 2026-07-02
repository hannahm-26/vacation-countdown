import { ContentWrapper } from "@/ui/ContentWrapper";

export function CountDaysTiles ({days, subtitle, title}:{days: number, subtitle: string, title: string}) {
    return (
         <ContentWrapper>
                  <h2 id="countdown-summary-title" className="summary-card__title">
                   {title}
                  </h2>
                  <h1 className="summary-card__text">{days ?? "—"}</h1>
                  <p className="summary-card__hint">
                    {subtitle}
                  </p>
                </ContentWrapper>
    )
}