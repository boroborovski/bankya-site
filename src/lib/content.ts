import fs from 'node:fs/promises'
import path from 'node:path'
import { parse } from 'yaml'

const ROOT = process.cwd()

function parseFrontmatter(raw: string): Record<string, any> {
  const cleaned = raw.replace(/^﻿/, '')
  const match = cleaned.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  return parse(match[1]) ?? {}
}

export async function readSingleton(name: string): Promise<Record<string, any> | null> {
  try {
    const raw = await fs.readFile(path.join(ROOT, 'content/singletons', `${name}.yaml`), 'utf8')
    return parse(raw) ?? null
  } catch {
    return null
  }
}

export async function readCollection(name: string): Promise<Array<{ slug: string; entry: Record<string, any> }>> {
  try {
    const dir = path.join(ROOT, 'content', name)
    const files = (await fs.readdir(dir)).filter(f => f.endsWith('.yaml') || f.endsWith('.mdoc'))
    return Promise.all(
      files.map(async (f) => {
        const raw = await fs.readFile(path.join(dir, f), 'utf8')
        const slug = f.replace(/\.(yaml|mdoc)$/, '')
        const entry = f.endsWith('.mdoc') ? parseFrontmatter(raw) : (parse(raw) ?? {})
        return { slug, entry }
      })
    )
  } catch {
    return []
  }
}

export async function readCollectionEntry(
  name: string,
  slug: string
): Promise<{ slug: string; entry: Record<string, any> } | null> {
  for (const ext of ['mdoc', 'yaml']) {
    try {
      const raw = await fs.readFile(path.join(ROOT, 'content', name, `${slug}.${ext}`), 'utf8')
      const entry = ext === 'mdoc' ? parseFrontmatter(raw) : (parse(raw) ?? {})
      return { slug, entry }
    } catch {
      continue
    }
  }
  return null
}
