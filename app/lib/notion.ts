import { Client } from "@notionhq/client"
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints"

if (!process.env.NOTION_DATASOURCE_ID || !process.env.NOTION_API_KEY) {
  throw new Error("Missing Notion environment variables: NOTION_DATASOURCE_ID and NOTION_API_KEY are required")
}

export const dataSourceId = process.env.NOTION_DATASOURCE_ID
export const notion = new Client({ auth: process.env.NOTION_API_KEY })

// ─── Types ───────────────────────────────────────────────────────────────────

export type BlogPost = {
  id: string
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  cover: string | null
  published: boolean
}

export type Block = BlockObjectResponse & { children?: Block[] }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function richTextToPlain(rich: RichTextItemResponse[]): string {
  return rich.map((r) => r.plain_text).join("")
}

function pageToPost(page: PageObjectResponse): BlogPost {
  const props = page.properties as Record<string, any>

  const title = props.Name?.title
    ? richTextToPlain(props.Name.title)
    : props.Title?.title
    ? richTextToPlain(props.Title.title)
    : "Untitled"

  const slug = props.Slug?.rich_text?.length
    ? richTextToPlain(props.Slug.rich_text)
    : page.id

  const description = props.Description?.rich_text?.length
    ? richTextToPlain(props.Description.rich_text)
    : ""

  const date = props.Date?.date?.start ?? ""

  const tags: string[] = props.Tags?.multi_select?.map((t: any) => t.name) ?? []

  const published: boolean = props.Published?.checkbox ?? false

  let cover: string | null = null
  if (page.cover?.type === "external") cover = page.cover.external.url
  else if (page.cover?.type === "file") cover = page.cover.file.url

  return { id: page.id, slug, title, description, date, tags, cover, published }
}

// ─── Queries ─────────────────────────────────────────────────────────────────

/** Fetch all published posts, sorted by date descending */
export async function getPosts(): Promise<BlogPost[]> {
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Date", direction: "descending" }],
  })

  return response.results
    .filter((p): p is PageObjectResponse => p.object === "page")
    .map(pageToPost)
}

/** Fetch a single post by its slug property, falling back to page ID */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // Try slug property first (may throw if the database has no Slug property)
  try {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Slug",
        rich_text: { equals: slug },
      },
    })

    const page = response.results.find(
      (p): p is PageObjectResponse => p.object === "page"
    )
    if (page) return pageToPost(page)
  } catch {
    // Slug property doesn't exist — fall through to ID lookup
  }

  // Fall back to page ID lookup
  try {
    const byId = await notion.pages.retrieve({ page_id: slug })
    return pageToPost(byId as PageObjectResponse)
  } catch {
    return null
  }
}

/** Fetch all blocks for a page (with nested children) */
export async function getBlocks(blockId: string): Promise<Block[]> {
  const blocks: Block[] = []
  let cursor: string | undefined

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    })

    for (const block of response.results) {
      const b = block as Block
      if (b.has_children) {
        b.children = await getBlocks(b.id)
      }
      blocks.push(b)
    }

    cursor = response.next_cursor ?? undefined
  } while (cursor)

  return blocks
}
