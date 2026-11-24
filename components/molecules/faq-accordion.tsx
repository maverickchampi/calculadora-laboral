export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  name?: string;
}

export default function FaqAccordion({ items, name = "faq" }: FaqAccordionProps) {
  return (
    <div className="mt-4 divide-y divide-line">
      {items.map((item) => (
        <details key={item.question} name={name} className="faq-item py-3">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-foreground">
            <span>{item.question}</span>
            <i
              className="mc-chevron-down faq-chevron shrink-0"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
