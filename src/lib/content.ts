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

export async function readSingleton(name: string, locale = 'bg'): Promise<Record<string, any> | null> {
  const files = locale !== 'bg'
    ? [`${name}.${locale}.yaml`, `${name}.yaml`]
    : [`${name}.yaml`]
  for (const file of files) {
    try {
      const raw = await fs.readFile(path.join(ROOT, 'content/singletons', file), 'utf8')
      return parse(raw) ?? null
    } catch {
      continue
    }
  }
  return null
}

export async function readCollection(
  name: string,
  locale = 'bg'
): Promise<Array<{ slug: string; entry: Record<string, any> }>> {
  try {
    const dir = path.join(ROOT, 'content', name)
    const allFiles = await fs.readdir(dir)
    // Base files only — exclude locale-specific variants (e.g. foo.en.yaml / foo.en.md)
    const baseFiles = allFiles.filter(f => {
      if (!f.endsWith('.yaml') && !f.endsWith('.md')) return false
      return !/\.[a-z]{2}\.(yaml|md)$/.test(f)
    })

    return Promise.all(
      baseFiles.map(async (f) => {
        const ext = f.endsWith('.yaml') ? 'yaml' : 'md'
        const slug = f.slice(0, -(ext.length + 1))

        let fileToRead = f
        if (locale !== 'bg') {
          const localeFile = `${slug}.${locale}.${ext}`
          if (allFiles.includes(localeFile)) fileToRead = localeFile
        }

        const raw = await fs.readFile(path.join(dir, fileToRead), 'utf8')
        const entry = fileToRead.endsWith('.md') ? parseFrontmatter(raw) : (parse(raw) ?? {})
        return { slug, entry }
      })
    )
  } catch {
    return []
  }
}

export async function readCollectionEntry(
  name: string,
  slug: string,
  locale = 'bg'
): Promise<{ slug: string; entry: Record<string, any>; filePath: string } | null> {
  const dir = path.join(ROOT, 'content', name)
  const candidates = locale !== 'bg'
    ? [`${slug}.${locale}.md`, `${slug}.${locale}.yaml`, `${slug}.md`, `${slug}.yaml`]
    : [`${slug}.md`, `${slug}.yaml`, `${slug}.mdoc`]

  for (const file of candidates) {
    try {
      const filePath = path.join(dir, file)
      const raw = await fs.readFile(filePath, 'utf8')
      const entry = file.endsWith('.md') || file.endsWith('.mdoc')
        ? parseFrontmatter(raw)
        : (parse(raw) ?? {})
      return { slug, entry, filePath }
    } catch {
      continue
    }
  }
  return null
}
