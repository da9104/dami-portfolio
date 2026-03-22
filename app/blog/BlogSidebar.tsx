'use client'

import Link from 'next/link'
import { Fragment } from 'react'
import { useLanguage } from '@/app/context/languageProvider'
import { translations } from '@/app/translations'
import { BlogPost } from '@/app/lib/notion'

export default function BlogSidebar({ posts }: { posts: BlogPost[] }) {
    const { lang } = useLanguage()
    const t = translations[lang]

    return (
        <aside className="sidebar">
            <div className="sidebar-inner">

                <div className="card card-lavender" style={{ flex: 2 }}>
                    <Link href="/">
                        <p className="hero-role">← Back to portfolio</p>
                    </Link>
                    {/* <span className="card-tag">Writing</span> */}
                    <h1 className="hero-name">Dami<br />Kang</h1>
                    <span aria-hidden="true" className="hero-initial">W</span>
                </div>

                <div className="card card-dark">
                    <span className="card-label light">blog</span>
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
                </div>

                <div className="card card-cream" style={{ flex: 1 }}>
                    <span className="card-label">About</span>
                    <p className="about-text" style={{ fontSize: '14px' }}>
                        {t.aboutText[0]}  {/* or whatever translation key fits */}
                        {t.aboutText[1]}
                        {t.aboutText[2]}
                        {t.aboutText[3]}
                        {t.aboutText[4]}
                    </p>
                    <div className="about-location">
                        <span className="dot" />
                        Seoul / UK
                    </div>
                </div>

            </div>
        </aside>
    )
}