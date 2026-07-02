export function ContentWrapper({children}){
return (
          <section
          aria-labelledby="countdown-summary-title"
          className="summary-card card card--panel"
        >{children}</section>
)
}