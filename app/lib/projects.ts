export interface ProjectLink {
  label: string
  href: string
  icon: 'github' | 'demo' | 'report' | 'slides' | 'poster'
}

export interface Project {
  id: number
  tags: string[]
  award?: string
  image: string
  links: ProjectLink[]
}

export const projects: Project[] = [
  {
    id: 1,
    tags: ['#Slack Bot', '#Notion API', '#LLM'],
    image: '/images/project-1.webp',
    links: [
      { label: 'GitHub', href: 'https://github.com/da9104/ai-helper-frontend', icon: 'github' },
      { label: 'Demo', href: 'https://ai-helper-frontend-eight.vercel.app', icon: 'demo' },
    ],
  },
  {
    id: 2,
    tags: ['#Voice Recording', '#Telegram Bot', '#LLM'],
    image: '/images/project-2.webp',
    links: [
      { label: 'GitHub', href: 'https://github.com/da9104/ai-voice-recording-frontend', icon: 'github' },
      { label: 'Demo', href: 'https://ai-voice-recording-frontend.vercel.app', icon: 'demo' },
    ],
  },
  {
    id: 3,
    award: '🏆 Google AI X Dev.to new year new me portfolio frontend challenge',
    tags: ['#Gemini', '#Nanobanana', '#Framer'],
    image: '/images/project-3.webp',
    links: [
      { label: 'GitHub', href: 'https://github.com/da9104/portfolio-2026', icon: 'github' },
      { label: 'Demo', href: 'https://damikang-portfolio.vercel.app', icon: 'demo' },
    ],
  },
  {
    id: 4,
    award: '🏆 Google Korea K-startup Chang-goo 7th batch',
    tags: ['#Gemini', '#Next.js', '#TypeScript'],
    image: '/images/project-4.webp',
    links: [
      { label: 'URL', href: 'https://www.toonyz.com', icon: 'demo' }
    ],
  },
  {
    id: 5,
    tags: ['#Next.js', '#SEO'],
    image: '/images/project-5.webp',
    links: [
      { label: 'URL', href: 'https://stelland.io', icon: 'demo' },
    ],
  },
  {
    id: 6,
    award: '🏆 1st Prize, SW open source contest Korea 2024',
    tags: ['#Jira', '#atlassian', 'Dashboard'],
    image: '/images/project-6.webp',
    links: [
      { label: 'URL', href: 'https://a-rms.net', icon: 'demo' },
    ],
  },
]
