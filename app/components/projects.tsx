import {
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline"
import { getProjects, type Metadata } from "app/portfolio/utils"
import Link from "next/link"

const MAX_VISIBLE_TECHNOLOGIES = 5

interface ProjectCardProps {
  project: Metadata & { slug: string }
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="h-48 bg-base-200 flex items-center justify-center">
        {
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        }
      </figure>
      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="whitespace-pre-line">{project.summary}</p>
        <div className="flex flex-wrap gap-2 my-2">
          {project.technologies
            .slice(0, MAX_VISIBLE_TECHNOLOGIES)
            .map((technology) => (
              <div key={technology} className="badge badge-outline">
                {technology}
              </div>
            ))}
          {project.technologies.length > MAX_VISIBLE_TECHNOLOGIES && (
            <div
              className="lg:tooltip"
              data-tip={project.technologies
                .slice(MAX_VISIBLE_TECHNOLOGIES)
                .join(", ")}
            >
              <div className="badge badge-ghost">
                +{project.technologies.length - MAX_VISIBLE_TECHNOLOGIES}
              </div>
            </div>
          )}
        </div>
        <div className="card-actions justify-between">
          <Link
            href={`/portfolio/${project.slug}`}
            className="btn btn-primary btn-sm"
          >
            詳細を見る
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <div className="flex gap-1">
            {project.demoUrl && (
              <div className="lg:tooltip" data-tip="デモを見る">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm"
                >
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </a>
              </div>
            )}
            {project.repositoryUrl && (
              <div className="lg:tooltip" data-tip="ソースコードを見る">
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-circle btn-sm"
                >
                  <CodeBracketIcon className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProjectsProps {
  limit?: number
}

export function Projects({ limit }: ProjectsProps) {
  const allProjects = getProjects()
  const projects = limit ? allProjects.slice(0, limit) : allProjects

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={{
            slug: project.slug,
            ...project.metadata,
          }}
        />
      ))}
    </div>
  )
}
