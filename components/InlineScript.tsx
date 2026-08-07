/**
 * An inline script that has to run while the HTML is still parsing — before
 * React hydrates — without tripping React's "Encountered a script tag while
 * rendering React component" warning.
 *
 * The type attribute is the whole trick, and it is the pattern Next documents
 * for preventing a flash before hydration:
 *
 *   - On the server it is `text/javascript`, so the browser executes it as it
 *     parses, which is the only moment early enough to be useful.
 *   - On the client it is `text/plain`, so React sees an inert data block
 *     rather than a script it would refuse to execute on a soft navigation.
 *
 * suppressHydrationWarning covers the deliberate mismatch between those two.
 */
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
