import lyricsSource from './fiat_lyrics_tidy.txt?raw'

export function normalizeSongTitle(title) {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

export const lyricsByTitle = Object.fromEntries(
  lyricsSource
    .split(/^─{5,}\s*$/m)
    .map((section) => {
      const [heading, ...lyricsLines] = section.trim().split(/\r?\n/)
      if (!heading) return null

      const title = heading.replace(/^FIAT\s+/i, '').trim()
      if (!title) return null
      return [normalizeSongTitle(title), {
        original: lyricsLines.join('\n').trim(),
        translations: {},
        explanations: [],
      }]
    })
    .filter(Boolean),
)