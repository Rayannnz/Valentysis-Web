import type { ReactNode } from "react";

/*
 * The one section opener. Eyebrow, heading, and an optional one-sentence
 * subline stacked in a column, with an optional action (a link) on the right.
 * `heading` is a node so a line can be broken by hand (<br />) where it should
 * read as two short statements. The markup follows the .sec-head vocabulary in
 * globals.css, so the inner pages, which still write it inline, match.
 */
export default function SectionHeader({
  eyebrow,
  heading,
  subline,
  action,
  align = "start",
}: {
  eyebrow: string;
  heading: ReactNode;
  subline?: ReactNode;
  action?: ReactNode;
  align?: "start" | "center";
}) {
  return (
    <div className={`sec-head${align === "center" ? " sec-head-center" : ""}`}>
      <div className="sec-head-copy">
        <p className="sec-eyebrow" data-reveal>
          {eyebrow}
        </p>
        <h2 className="sec-title" data-reveal>
          {heading}
        </h2>
        {subline && (
          <p className="sec-note" data-reveal>
            {subline}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
