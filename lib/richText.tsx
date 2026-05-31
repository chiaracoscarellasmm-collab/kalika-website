import { Fragment } from "react";

/**
 * Render a string with simple `**bold**` markers as inline React nodes.
 * Used in dictionary copy where a phrase needs emphasis without leaking markup.
 */
export function richText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((chunk, i) => {
    if (chunk.startsWith("**") && chunk.endsWith("**")) {
      return (
        <strong
          key={i}
          className="font-semibold text-[var(--color-brown)]"
        >
          {chunk.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{chunk}</Fragment>;
  });
}
