import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/ProjectDetail';
import { PROJECTS, getProject } from '@/lib/projects';
import { roleOf } from '@/lib/tech';
import { EVENTS } from '@/lib/timeline';

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — Daniyal Zia`,
    description: project.tagline,
    openGraph: { title: `${project.name} — Daniyal Zia`, description: project.description },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = PROJECTS.indexOf(project);
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  const stack = project.stack.map((tech) => ({ tech, role: roleOf(tech) }));
  const milestones = EVENTS.filter((e) => e.project === project.timelineKey);

  return (
    <main>
      <ProjectDetail
        project={project}
        stack={stack}
        milestones={milestones}
        prev={{ slug: prev.slug, name: prev.name }}
        next={{ slug: next.slug, name: next.name }}
      />
    </main>
  );
}
