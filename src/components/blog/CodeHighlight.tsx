"use client";

import { useEffect, useRef } from "react";

export function CodeHighlight() {
  const ref = useRef<HTMLDivElement>(null);
  const highlighted = useRef(false);

  useEffect(() => {
    if (highlighted.current || !ref.current) return;

    // Dynamic import highlight.js for code splitting
    import("highlight.js").then((hljs) => {
      if (!ref.current) return;
      ref.current.querySelectorAll("pre code").forEach((block) => {
        // Remove any existing highlighting classes
        block.className = block.className
          .split(" ")
          .filter((c) => !c.startsWith("hljs"))
          .join(" ");
        hljs.default.highlightElement(block as HTMLElement);
      });
      highlighted.current = true;
    });
  }, []);

  return <div ref={ref} />;
}
