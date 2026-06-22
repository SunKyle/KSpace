import { cn } from "@/lib/utils";

interface MDXRendererProps {
  code: string;
  className?: string;
}

export function MDXRenderer({ code, className }: MDXRendererProps) {
  return (
    <div
      className={cn("prose-custom", className)}
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
