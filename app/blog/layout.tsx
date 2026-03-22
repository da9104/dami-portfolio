import { getPosts } from '@/app/lib/notion'
import BlogSidebar from './BlogSidebar'

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
  const posts = await getPosts()

  return (
    <div className="page">
      <BlogSidebar posts={posts} />
      <main className="content-area">
        {children}
      </main>
    </div>
  )
}