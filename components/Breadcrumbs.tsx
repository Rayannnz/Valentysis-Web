import Link from "next/link";

export type Crumb = { name: string; path: string };

/**
 * Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted by
 * the page from the same `trail` array — Google discards a breadcrumb graph
 * that doesn't correspond to something on the page, so the two must be built
 * from one source.
 *
 * The last crumb is the current page: rendered as text with aria-current rather
 * than a link to itself.
 */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <div className="container">
        <ol>
          {trail.map(({ name, path }, i) => {
            const isCurrent = i === trail.length - 1;
            return (
              <li key={path}>
                {isCurrent ? (
                  <span aria-current="page">{name}</span>
                ) : (
                  <Link href={path}>{name}</Link>
                )}
                {!isCurrent && (
                  <svg
                    className="crumb-sep"
                    aria-hidden="true"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
