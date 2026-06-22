declare module "rehype-shiki" {
  import type { Root } from "hast";
  interface RehypeShikiOptions {
    theme?: string;
    [key: string]: unknown;
  }
  export default function rehypeShiki(
    options?: RehypeShikiOptions
  ): (tree: Root) => Promise<void>;
}
