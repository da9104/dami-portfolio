import { getPostBySlug, getBlocks } from '@/app/lib/notion'
import { notFound } from 'next/navigation'
import { formatDate } from '@/app/lib/utils'
import Image from 'next/image'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const blocks = await getBlocks(post.id)

  return (
    <div className="card card-cream" style={{ margin: 'var(--gap)', minHeight: '100%' }}>
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
          {post.date && (
            <p className="text-sm opacity-50 mb-3">{formatDate(post.date)}</p>
          )}
          {post.description && (
            <p className="text-base opacity-60 mb-4">{post.description}</p>
          )}
          {post.cover && (
            <Image
              src={post.cover}
              alt={post.title}
              width={800}
              height={400}
              className="w-full max-h-96 object-cover rounded-lg mb-6"
            />
          )}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 border border-current rounded-full opacity-50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-stone max-w-none">
          {blocks.map((block) => {
            if (block.type === 'paragraph') {
              const text = block.paragraph.rich_text
                .map((r: { plain_text: string }) => r.plain_text)
                .join('')
              return <p key={block.id} className="mb-4 leading-relaxed opacity-80">{text}</p>
            }
            if (block.type === 'heading_1') {
              const text = block.heading_1.rich_text
                .map((r: { plain_text: string }) => r.plain_text)
                .join('')
              return <h1 key={block.id} className="text-3xl font-bold mt-8 mb-4">{text}</h1>
            }
            if (block.type === 'heading_2') {
              const text = block.heading_2.rich_text
                .map((r: { plain_text: string }) => r.plain_text)
                .join('')
              return <h2 key={block.id} className="text-2xl font-semibold mt-6 mb-3">{text}</h2>
            }
            if (block.type === 'heading_3') {
              const text = block.heading_3.rich_text
                .map((r: { plain_text: string }) => r.plain_text)
                .join('')
              return <h3 key={block.id} className="text-xl font-semibold mt-5 mb-2">{text}</h3>
            }
            if (block.type === 'bulleted_list_item') {
              const text = block.bulleted_list_item.rich_text
                .map((r: { plain_text: string }) => r.plain_text)
                .join('')
              return <li key={block.id} className="ml-6 mb-1 list-disc opacity-80">{text}</li>
            }
            if (block.type === 'numbered_list_item') {
              const text = block.numbered_list_item.rich_text
                .map((r: { plain_text: string }) => r.plain_text)
                .join('')
              return <li key={block.id} className="ml-6 mb-1 list-decimal opacity-80">{text}</li>
            }
            if (block.type === 'code') {
              const text = block.code.rich_text
                .map((r: { plain_text: string }) => r.plain_text)
                .join('')
              return (
                <pre key={block.id} className="bg-black/5 rounded-lg p-4 mb-4 overflow-x-auto">
                  <code className="text-sm font-mono">{text}</code>
                </pre>
              )
            }
            if (block.type === 'image') {
              const url =
                block.image.type === 'external'
                  ? block.image.external.url
                  : block.image.file.url
              return (
                <Image
                  key={block.id}
                  src={url}
                  alt=""
                  width={800}
                  height={400}
                  className="w-full rounded-lg mb-4"
                />
              )
            }
            return null
          })}
        </div>
      </article>
    </div>
  )
}
