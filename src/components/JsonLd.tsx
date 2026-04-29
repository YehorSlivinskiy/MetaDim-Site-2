/**
 * Inlines a JSON-LD <script> in the document head/body.
 * Server component — safe to use anywhere.
 */
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
