import Link from "next/link";
import { FileText } from "lucide-react";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="border-b border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-secondary))]">
        <div className="container-page py-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-3xl font-bold tracking-tight"
          >
            <FileText size={28} className="text-[rgb(var(--color-accent))]" />
            博客
          </Link>
          <p className="mt-2 text-[rgb(var(--color-text-secondary))]">
            技术思考与实践分享
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
