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
        title,
        original: lyricsLines.join('\n').trim(),
        translations: {},
        explanations: [],
      }]
    })
    .filter(Boolean),
)

const lyricLabelPattern = /^(?:(?:Martin Aston|Mai Barzotto|Piccolo Str\*nzo|Lucian|MelogVano|Martin|Piccolo|M|P)\b.*:|(?:Hook|Intro|Strofa)\b.*:)/i

export const lyricChallenges = Object.values(lyricsByTitle).flatMap(({ title, original }) => {
  const verses = []
  let verse = []

  const saveVerse = () => {
    if (verse.length >= 3) verses.push(verse)
    verse = []
  }

  original.split(/\r?\n/).forEach((line) => {
    const lyricLine = line.trim()

    if (!lyricLine || lyricLabelPattern.test(lyricLine)) {
      saveVerse()
      return
    }

    verse.push(lyricLine)
  })
  saveVerse()

  return verses.flatMap((lines, verseIndex) =>
    lines.slice(1, -1).flatMap((answer, lineIndex) => {
      if (answer.length < 8 || answer.length > 140) return []

      return [{
        id: `${normalizeSongTitle(title)}-${verseIndex}-${lineIndex}`,
        songTitle: title,
        previousLine: lines[lineIndex],
        answer,
        nextLine: lines[lineIndex + 2],
      }]
    }),
  )
})

const lyricArtistNames = new Map([
  ['Martin Aston', 'Martin Aston'],
  ['Mai Barzotto', 'Mai Barzotto'],
  ['Piccolo Str*nzo', 'Piccolo Str*nzo'],
  ['Piccolo Stronzo', 'Piccolo Str*nzo'],
  ['Lucian', 'Lucian'],
  ['MelogVano', 'MelogVano'],
].map(([sourceName, artistName]) => [normalizeSongTitle(sourceName), artistName]))

export const artistChallenges = Object.values(lyricsByTitle).flatMap(({ title, original }) => {
  const challenges = []
  let currentArtist = null

  original.split(/\r?\n/).forEach((line, lineIndex) => {
    const lyricLine = line.trim()
    const attribution = lyricLine.match(/^([^:]+):$/)

    if (attribution) {
      currentArtist = lyricArtistNames.get(normalizeSongTitle(attribution[1])) ?? null
      return
    }

    if (!lyricLine) {
      currentArtist = null
      return
    }

    if (!currentArtist) return

    const words = lyricLine.split(/\s+/)
    for (let startIndex = 0; startIndex <= words.length - 5; startIndex += 5) {
      challenges.push({
        id: `${normalizeSongTitle(title)}-${lineIndex}-${startIndex}`,
        songTitle: title,
        snippet: words.slice(startIndex, startIndex + 5).join(' '),
        artist: currentArtist,
      })
    }
  })

  return challenges
})