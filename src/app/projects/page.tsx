import type { Metadata } from "next";
import { projects } from "@/lib/velite";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  title: "项目",
  description: "开源项目与深度案例展示",
};

export default function ProjectsPage() {
  const sorted = projects.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const featured = sorted.filter((p) => p.featured);
  const rest = sorted.filter((p) => !p.featured);

  return (
    <div className="container-page py-12 sm:py-16">
      {/* Header */}
      <div className="mx-auto max-w-2xl mb-12">
        <span className="section-label">portfolio</span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">项目</h1>
        <p className="mt-3 text-lg text-[rgb(var(--color-text-secondary))]">
          开源项目与深度案例展示
        </p>
      </div>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-2xl mb-14">
          <span className="section-label">featured</span>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 80}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="mx-auto max-w-2xl">
        {rest.length > 0 && (
          <span className="section-label">all</span>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          {rest.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 80}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
