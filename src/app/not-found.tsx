import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="container-page flex flex-col items-center justify-center py-32 text-center">
      <p className="text-8xl font-bold text-[rgb(var(--color-accent))]/30">
        404
      </p>
      <h1 className="mt-6 text-2xl font-bold">页面不存在</h1>
      <p className="mt-2 text-[rgb(var(--color-text-secondary))]">
        你访问的页面可能已被删除，或地址输入有误。
      </p>
      <Link href="/" className="btn-primary mt-8">
        <ArrowLeft size={16} />
        返回首页
      </Link>
    </div>
  );
}
