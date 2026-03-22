'use client'

import { Fragment } from 'react'

import { useLanguage } from '@/app/context/languageProvider'
import { translations } from '@/app/translations'
import { BlogPost } from '@/app/lib/notion'
import Link from 'next/link'
import Image from 'next/image'
import ProjectsGrid from './ProjectsGrid'
import { FolderDown } from 'lucide-react'

interface HomeComponentProps {
    posts: BlogPost[]
}

const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'Figma', 'PostgreSQL', 'Docker', 'GraphQL']

export default function Home({ posts }: HomeComponentProps) {
    const { lang } = useLanguage()
    const t = translations[lang]

    return (
        <div className="page">

            {/* ── Sticky left sidebar ── */}
            <aside className="sidebar">
                <div className="sidebar-inner">

                    {/* Hero */}
                    <div className="card card-lavender">
                        <span className="card-tag">{t.available}</span>
                        <h1 className="hero-name">Dami<br />Kang</h1>
                        <p className="hero-role">{t.heroRole.split('\n').map((line, i) => (
                            <span key={i}>{line}{i === 0 && <br />}</span>
                        ))}</p>
                        <div className="hero-badge">{t.exp}</div>
                        <span aria-hidden="true" className="hero-initial">D</span>
                    </div>

                    {/* Experience */}
                    <div className="card card-coral">
                        <span className="card-label light">{t.expLabel}</span>
                        <div className="exp-list">
                            {t.jobs.map((job, i) => (
                                <Fragment key={i}>
                                    {i > 0 && <div className="exp-divider" />}
                                    <div className="exp-item">
                                        <span className="exp-role">{job.role}</span>
                                        <span className="exp-company">{job.company}</span>
                                        <span className="exp-years">{job.years}</span>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="card card-mint">
                        <span className="card-label">{t.skillsLabel}</span>
                        <div className="skills-grid">
                            {skills.map((s, i) => (
                                <span key={i} className="skill-pill">{s}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* ── Scrollable right content ── */}
            <main className="content-area">
                <div className="bento-right">

                    {/* About */}
                    <div className="card card-cream card-about">
                        <span className="card-label">{t.aboutLabel}</span>
                        <div className="flex flex-row justify-between">
                            <p className="about-text w-full">
                                {t.aboutText[0]}{' '}
                                <em>{t.aboutText[1]}</em>{' '}
                                {t.aboutText[2]}{' '}
                                <em>{t.aboutText[3]}</em>{' '}
                                {t.aboutText[4]}{' '}
                            </p>
                            <Image
                                src='/images/profile.webp'
                                alt='profile'
                                width={100} height={100}
                                className='rounded-full shrink-0 w-[100px] h-[100px] object-cover'
                            />
                        </div>
                        <div className="about-location">
                            <span className="dot" />
                            {t.location}
                            <button className="bg-white text-black px-4 py-1 flex flex-row justify-center items-center gap-2">
                               <FolderDown size={12} />
                                Download my CV
                            </button>
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <section className="projects-section">
                        <h2 className="exp-section-heading">{t.projectsLabel}</h2>
                        <ProjectsGrid />
                    </section>

                    {/* Expanded Experience */}
                    <div className="card card-cream card-exp-detail">
                        <h2 className="exp-section-heading">{t.expLabel}</h2>
                        <div className="exp-entries">
                            {t.jobs.map((job, i) => (
                                <div key={i} className="exp-entry">
                                    <div className="exp-entry-header">
                                        <span className="exp-entry-dot" />
                                        <div>
                                            <span className="exp-entry-role">{job.role}</span>
                                            <span className="exp-entry-meta">{job.company} · {job.years}</span>
                                        </div>
                                    </div>
                                    <ul className="exp-entry-bullets">
                                        {job.bullets.map((b, j) => <li key={j}>{b}</li>)}
                                    </ul>
                                    {i < t.jobs.length - 1 && <div className="exp-entry-divider" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div className="card card-cream card-edu-detail">
                        <h2 className="edu-section-heading">{t.educationLabel}</h2>
                        <div className="edu-entries">
                            {t.educations.map((edu, i) => (
                                <Fragment key={i}>
                                    {i > 0 && <div className="edu-entry-divider" />}
                                    <div className="edu-entry">
                                        <div className="edu-entry-top">
                                            <span className="edu-flag">{edu.flag}</span>
                                            <div>
                                                <span className="edu-school">{edu.school}</span>
                                                <span className="edu-meta">{edu.location} · {edu.years}</span>
                                            </div>
                                        </div>
                                        <p className="edu-degree">{edu.degree}</p>
                                        <p className="edu-courses"><strong>{t.educationCoursesLabel}:</strong> {edu.courses}</p>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Projects */}
                    {/* <div className="card card-dark card-projects">
                        <span className="card-label">{t.projectsLabel}</span>
                        <ul className="project-list">
                            {t.projects.map((p, i) => (
                                <li key={i} className="project-item">
                                    <div className="project-info">
                                        <span className="project-title">{p.title}</span>
                                        <span className="project-tag">{p.tag}</span>
                                    </div>
                                    <span className="project-year">{p.year}</span>
                                </li>
                            ))}
                        </ul>
                        <a href="#" className="see-all">{t.seeAll}</a>
                    </div> */}


                    {/* Blog */}
                    <div className="card card-dark card-contact">
                        {/* bg-[#495c6a] */}
                        <span className="card-label light">{t.blog}</span>
                        <div className="blog-list">
                            {posts.map((post, i) => (
                                <Fragment key={post.id}>
                                    {i > 0 && <div className="exp-divider" />}
                                    <li className="blog-item">
                                        <Link href={`/blog/${post.slug}`} className="flex flex-row justify-between">
                                            <span className="blog-title">{post.title}</span>
                                            <span className="blog-date">{post.date}</span>
                                        </Link>
                                        <p className="blog-description">{post.description}</p>
                                    </li>
                                </Fragment>
                            ))}
                        </div>
                        <a href="#" className="see-all">{t.seeBlog}</a>
                    </div>

                    {/* Social */}
                    <div className="card card-sky card-social">
                        <span className="card-label">{t.socialLabel}</span>
                        <div className="social-links">
                            <a href="https://github.com/da9104" className="social-link">GitHub →</a>
                            <a href="https://www.linkedin.com/in/kangdami" className="social-link">LinkedIn →</a>
                            <a href="#" className="social-link">Dribbble →</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
