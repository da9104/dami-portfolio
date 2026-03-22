'use client'

import { projects, ProjectLink } from '../lib/projects'
import { useLanguage } from '@/app/context/languageProvider'
import { translations } from '@/app/translations'
import Image from 'next/image'

function GitHubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function DemoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
      <path d="M6 3.5l6 4.5-6 4.5V3.5z" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 0h5.5l4.5 4.5V14a2 2 0 01-2 2H4a2 2 0 01-2-2V2a2 2 0 012-2zm5 1v4h4L9 1zM5 8h6v1H5V8zm0 2h6v1H5v-1zm0 2h4v1H5v-1z" />
    </svg>
  )
}

function SlidesIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1 2h14a1 1 0 011 1v9a1 1 0 01-1 1H8v1.5l2 .5v1H6v-1l2-.5V13H1a1 1 0 01-1-1V3a1 1 0 011-1zm0 1v9h14V3H1z" />
    </svg>
  )
}

function LinkIcon({ icon }: { icon: ProjectLink['icon'] }) {
  switch (icon) {
    case 'github': return <GitHubIcon />
    case 'demo':   return <DemoIcon />
    case 'poster': return <DocumentIcon />
    case 'report': return <DocumentIcon />
    case 'slides': return <SlidesIcon />
  }
}

export default function ProjectsGrid() {
  const { lang } = useLanguage()
  const t = translations[lang]
  const mergedProjects = projects.map(p => ({
    ...p,
    ...t.projects.find(tp => tp.id === p.id)!,
  }))

  return (
   <>
      <div className="projects-grid">
        {mergedProjects.map((project) => (
          <article
            key={project.id}
            className="proj-card"
          >
            <Image src={project.image} alt={project.title} width={100} height={100} className="proj-card-image" />

            <div className="proj-card-body">
              <div className="proj-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="proj-tag">{tag}</span>
                ))}
                {project.award && (
                  <span className="proj-award">{project.award}</span>
                )}
              </div>

              <h3 className="proj-title">{project.title}</h3>
              <p className="proj-desc">{project.description}</p>

              <div className="proj-links">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="proj-link-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkIcon icon={link.icon} />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
