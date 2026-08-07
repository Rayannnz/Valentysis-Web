/**
 * Renders a structured-data graph as a single ld+json script.
 *
 * `<` is escaped because a stray "</script>" inside any string value would
 * close the tag early and spill the rest of the graph into the document.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
