import { useEffect, useState } from 'react'
import { HashRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import ashPhoto from './assets/artists/ash.png'
import lorisCaldoPhoto from './assets/artists/loris caldo.png'
import lucianPhoto from './assets/artists/lucian.png'
import maiBarzottoPhoto from './assets/artists/mai barzotto.png'
import martinAstonPhoto from './assets/artists/martin aston.png'
import melogvanoPhoto from './assets/artists/melogvano.png'
import piccoloStronzoPhoto from './assets/artists/piccolo stronzo.png'
import { artistChallenges, lyricsByTitle, lyricChallenges, normalizeSongTitle } from './content/lyrics'
import './App.css'

const tracks = [
  { title: 'Fiat Coupé', artists: 'Piccolo Str*nzo, Mai Barzotto, Martin Aston', producer: 'wxrst', duration: '3:05', videoId: 'D8LNZIiQKKk' },
  { title: 'Fiat Croma', artists: 'Martin Aston, Mai Barzotto, Piccolo Str*nzo', producer: 'wxrst', duration: '1:56', videoId: 'HYZVw-Rv4Fg' },
  { title: 'Fiat Panda', artists: 'MelogVano, Piccolo Str*nzo, Martin Aston, Mai Barzotto', producer: 'wxrst', duration: '3:30', videoId: '40lY_z8efTE' },
  { title: 'Fiat Penny', artists: 'Mai Barzotto, Martin Aston', producer: 'wxrst', duration: '2:08', videoId: '4jJDQGnC9Qg' },
  { title: 'Fiat Idea', artists: 'Martin Aston, Mai Barzotto', producer: 'wxrst', duration: '1:00', videoId: '0WDzgXFvevU' },
  { title: 'Fiat Brevetti', artists: 'Mai Barzotto, Martin Aston', producer: 'wxrst', duration: '2:07', videoId: 'xJ-CilAaf28' },
  { title: 'Fiat Grande Punto', artists: 'Lucian, Martin Aston, Mai Barzotto, Piccolo Str*nzo', producer: 'wxrst', duration: '3:07', videoId: 'cUni1qQIP6s' },
  { title: 'Fiat Oggi', artists: 'Mai Barzotto, Martin Aston', producer: 'wxrst', duration: '2:32', videoId: 'pPDDo4yNUMY' },
  { title: 'Fiat Marea', artists: 'Piccolo Str*nzo, Mai Barzotto, Martin Aston', producer: 'David Linhof', duration: '3:12', videoId: '23y07tQGG9s' },
  { title: 'Fiat Scudo', artists: 'Martin Aston, Piccolo Str*nzo', producer: 'wxrst', duration: '2:37', videoId: 'c2tjxmLgPmg' },
  { title: 'Fiat Multipla', artists: 'Loris Caldo, Martin Aston, Mai Barzotto', producer: 'wxrst', duration: '2:59', videoId: 'xWIgPdfEuoc' },
  { title: 'Fiat Marengo', artists: 'Piccolo Str*nzo, Martin Aston', producer: 'wxrst', duration: '2:37', videoId: '2GudihdRshE' },
  { title: 'Fiat Uno', artists: 'Mai Barzotto, Martin Aston', producer: 'wxrst', duration: '2:06', videoId: '8zz5M1bQoQg' },
  { title: 'Fiat Dino', artists: 'Martin Aston, Piccolo Str*nzo', producer: 'wxrst', duration: '2:06', videoId: 'jo-GiI-4QsQ' },
  { title: 'Fiat Duna', artists: 'Piccolo Str*nzo, Martin Aston', producer: 'trabbey', duration: '1:51', videoId: 'XfssLvCxvgQ' },
]

const lyricSpeakerNames = new Set([
  'Martin Aston',
  'Mai Barzotto',
  'Piccolo Str*nzo',
  'Lucian',
  'MelogVano',
])

const crew = [
  {
    name: 'Martin Aston',
    image: martinAstonPhoto,
    role: 'Co-founder · Artist · Mixing',
    tagline: 'The baroque stream-of-consciousness technician.',
    description: 'Martin is probably the most linguistically obsessive of the group. His writing frequently abandons conventional narrative in favour of phonetic associations, unexpected connections and increasingly obscure references. Italian and English constantly bleed into each other, while literature, cinema, geography, music and general cultural trivia are thrown into the mix. His verses feel like surrealist free association disguised as technical rap.',
    style: 'Extremely dense wordplay, internal rhymes, multilingual puns, associative writing, stream of consciousness.',
    influences: 'Abstract/underground hip-hop, literary surrealism, avant-garde humour, cinema, literature and an apparently unhealthy amount of general cultural trivia.',
    featured: true,
  },
  {
    name: 'Piccolo Str*nzo',
    image: piccoloStronzoPhoto,
    role: 'Co-founder · Artist',
    tagline: 'The blunt-force punchline rapper.',
    description: 'Where Martin tends to spiral into increasingly complicated associations, Piccolo is much more direct. His writing is built around short, aggressive setups and immediate punchlines. There\'s a lot of physicality to his imagery: fire, cars, violence, speed, bodily humour, sex and money. He repeatedly establishes himself as the guy who walks into the verse and starts causing problems.',
    style: 'Direct punchlines, aggressive humour, crude imagery, simple premises taken to absurd extremes.',
    influences: 'Battle rap, street-rap bravado, comedy rap, vulgar internet humour and classic “say something outrageous and keep escalating” writing.',
    featured: true,
  },
  {
    name: 'CameraLady',
    role: 'Camera · Direction',
    tagline: 'The best there is',
    description: 'We do not even know what her face looks like, but even though we do not pay her, she always captures the moment with the instincts of a great director. Natural, weird, and somehow done in one take: she never needs more.',
    featured: true,
  },
  {
    name: 'Ash',
    image: ashPhoto,
    role: 'Pet artist · Video cameo',
    tagline: 'The feline executive producer.',
    description: 'Ash appears when the moment is right, usually with no warning and absolutely no interest in doing another take. She brings quiet authority, impeccable timing and the kind of natural screen presence that cannot be taught.',
    style: 'Unscripted entrances, silent judgement, effortless star quality.',
    influences: 'Sunbeams, cardboard boxes and the ancient art of appearing exactly where she should not be.',
    featured: true,
  },
  {
    name: 'Mai Barzotto',
    image: maiBarzottoPhoto,
    role: 'Artist',
    tagline: 'The technical vulgarist / surrealist.',
    description: 'Mai\'s writing constantly jumps between everyday Italian, obscure references, double meanings, insults, and completely deranged imagery. He seems particularly interested in making unexpected linguistic connections and pushing an idea until it becomes funny. There\'s a strong interest in wordplay, phonetics and cultural references, often mixing highbrow material with extremely crude humour. His Italian occasionally incorporates Veronese dialect and regional expressions, adding another layer to his vocabulary and humour without being a constant feature of his writing.',
    style: 'Dense wordplay, absurdist imagery, vulgar humour, cultural references, linguistic games.',
    influences: 'Italian underground rap, surrealist comedy, internet humour, Italian regional culture, literary/cultural references, and the tradition of deliberately excessive punchline writing.',
    featured: true,
  },
  {
    name: 'Loris Caldo',
    image: lorisCaldoPhoto,
    role: 'Collaborating artist',
    tagline: 'The wildcard / crew presence.',
    description: 'Loris brings a looser, more chaotic energy to the crew, and his presence sits naturally within FIAT\'s absurdist, unserious and high-velocity world. He adds an element of unpredictability without losing the group\'s tone. ',
    style: 'Chaotic crew energy, absurdist humour, irreverence.',
    influences: 'The crew\'s shared underground/comedy-rap aesthetic and internet humour.',
  },
  {
    name: 'Lucian',
    image: lucianPhoto,
    role: 'Collaborating artist',
    tagline: 'The minimalist / atmosphere guy.',
    description: 'Lucian\'s writing is more stripped-down and understated than the other main rappers, focusing more on rhythm, attitude and concise imagery than linguistic overload. He provides a more restrained contrast to the denser writing elsewhere in the crew.',
    style: 'Sparse, rhythmic, understated, atmospheric.',
    influences: 'Contemporary rap flows, minimalist writing, street imagery and the more repetitive/hypnotic side of hip-hop.',
  },
  {
    name: 'MelogVano',
    image: melogvanoPhoto,
    monochrome: true,
    role: 'Collaborating artist',
    tagline: 'The atmospheric absurdist.',
    description: 'MelogVano brings an introspective, cinematic presence to the crew, balancing a thoughtful atmosphere with an offbeat sense of humor. His distinctive energy adds contrast and texture to FIAT\'s collaborative sound.',
    style: 'Atmospheric, narrative-focused rap with understated delivery, surreal humor and memorable hooks.',
    influences: 'Italian underground hip-hop, absurdist comedy and cinematic storytelling.',
  },
]

function normalizeLyricAnswer(answer) {
  return answer
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
}

function isSimilarAnswer(answer, expectedAnswer, minimumSimilarity = 0.93) {
  const normalizedAnswer = normalizeLyricAnswer(answer)
  const normalizedExpected = normalizeLyricAnswer(expectedAnswer)
  const longestLength = Math.max(normalizedAnswer.length, normalizedExpected.length)

  if (!normalizedAnswer || !normalizedExpected || !longestLength) return false
  if (Math.min(normalizedAnswer.length, normalizedExpected.length) / longestLength < 0.88) return false

  let previousRow = Array.from({ length: normalizedExpected.length + 1 }, (_, index) => index)

  for (let answerIndex = 1; answerIndex <= normalizedAnswer.length; answerIndex += 1) {
    const currentRow = [answerIndex]

    for (let expectedIndex = 1; expectedIndex <= normalizedExpected.length; expectedIndex += 1) {
      const substitutionCost = normalizedAnswer[answerIndex - 1] === normalizedExpected[expectedIndex - 1] ? 0 : 1
      currentRow[expectedIndex] = Math.min(
        currentRow[expectedIndex - 1] + 1,
        previousRow[expectedIndex] + 1,
        previousRow[expectedIndex - 1] + substitutionCost,
      )
    }

    previousRow = currentRow
  }

  return 1 - previousRow[normalizedExpected.length] / longestLength >= minimumSimilarity
}

function pickLyricChallenge(previousId) {
  const availableChallenges = lyricChallenges.filter((challenge) => challenge.id !== previousId)
  const choices = availableChallenges.length ? availableChallenges : lyricChallenges
  return choices[Math.floor(Math.random() * choices.length)]
}

function pickArtistChallenge(previousId) {
  const availableChallenges = artistChallenges.filter((challenge) => challenge.id !== previousId)
  const choices = availableChallenges.length ? availableChallenges : artistChallenges
  return choices[Math.floor(Math.random() * choices.length)]
}

function ScrollToLocation() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  }, [hash, pathname])

  return null
}

function SiteHeader() {
  return (
    <>
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="FIAT home">
          FIAT<span className="wordmark-period">.</span>
        </Link>
        <span className="header-note">Rap archive / Est. 2026</span>
      </header>
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About FIAT</NavLink>
        <NavLink to="/crew">Meet the Crew</NavLink>
        <NavLink to="/minigames">Minigames</NavLink>
        <Link to="/#contact">Contact us</Link>
      </nav>
    </>
  )
}

function HomePage() {
  return (
    <main>
      <section className="intro" aria-labelledby="intro-title">
        <div className="intro-copy">
          <p className="eyebrow">Independent rap collective</p>
          <h1 id="intro-title">FIATs.<br />One take. No brakes.</h1>
          <p className="intro-description">
            A home for every track we make together, inspired by our love of rap and Fiats.
          </p>
        </div>
        <div className="sound-art" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <span className="intro-index">01 / FIAT SOUNDS</span>
      </section>

      <section className="collection" aria-labelledby="collection-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The music</p>
            <h2 id="collection-title">Our collection</h2>
          </div>
          <span className="collection-count">{tracks.length} tracks</span>
        </div>
        <ol className="track-list">
          {tracks.map((track, index) => (
            <TrackRow key={track.videoId} track={track} index={index} />
          ))}
        </ol>
      </section>
    </main>
  )
}

function TrackRow({ track, index }) {
  const [lyricsOpen, setLyricsOpen] = useState(false)
  const songLyrics = lyricsByTitle[normalizeSongTitle(track.title.replace(/^Fiat\s+/i, ''))]
  const lyricLines = songLyrics?.original.split('\n') ?? []
  const lyricsId = `lyrics-${track.videoId}`

  return (
    <li className="track-entry">
      <div className="track-row">
        <span className="track-number">{String(tracks.length - index).padStart(2, '0')}</span>
        <img
          className="track-thumbnail"
          src={`https://i.ytimg.com/vi/${track.videoId}/mqdefault.jpg`}
          alt=""
          loading="lazy"
        />
        <div className="track-info">
          <h3>{track.title}</h3>
          <p>{track.artists}</p>
          <span>Prod. {track.producer}</span>
        </div>
        <span className="track-duration">{track.duration}</span>
        <div className="track-actions">
          <a
            className="track-link"
            href={`https://www.youtube.com/watch?v=${track.videoId}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Listen to ${track.title} on YouTube`}
          >
            Listen <span aria-hidden="true">↗</span>
          </a>
          <button
            className="lyrics-toggle"
            type="button"
            aria-expanded={lyricsOpen}
            aria-controls={lyricsId}
            onClick={() => setLyricsOpen(!lyricsOpen)}
          >
            {lyricsOpen ? 'Hide lyrics' : 'Lyrics'}
          </button>
        </div>
      </div>
      {lyricsOpen && (
        <section className="lyrics-panel" id={lyricsId} aria-label={`${track.title} lyrics`}>
          <div className="lyrics-panel-heading">
            <p className="eyebrow">Lyrics</p>
            <span>Original</span>
          </div>
          {songLyrics ? (
            <pre className="lyrics-text">
              {lyricLines.map((line, lineIndex) => {
                const isSpeaker = lyricSpeakerNames.has(line.replace(/:$/, '')) && line.endsWith(':')

                return (
                  <span key={`${lineIndex}-${line}`}>
                    {isSpeaker ? <strong>{line}</strong> : line}
                    {lineIndex < lyricLines.length - 1 ? '\n' : ''}
                  </span>
                )
              })}
            </pre>
          ) : (
            <p className="lyrics-pending">Lyrics coming soon.</p>
          )}
        </section>
      )}
    </li>
  )
}

function AboutPage() {
  return (
    <main>
      <section className="about-page-intro" aria-labelledby="about-title">
        <p className="eyebrow">Who we are</p>
        <h1 id="about-title">About FIAT</h1>
        <p className="about-intro">
          FIAT is a music project started by Martin Aston and Piccolo Str*nzo. Every song follows the same carefully kept workflow, from the first beat to the finished video.
        </p>
      </section>

      <section className="about" aria-labelledby="workflow-title">
        <p className="eyebrow">The process</p>
        <h2 id="workflow-title">Our workflow</h2>
        <ol className="workflow-list">
          <li>
            <span className="workflow-number">01</span>
            <div className="workflow-copy">
              <h3>Pick a beat</h3>
              <p>
                We choose a beat, most often from{' '}
                <a href="https://www.beatstars.com/wxrst" target="_blank" rel="noreferrer">
                  wxrst on BeatStars ↗
                </a>
                .
              </p>
            </div>
          </li>
          <li>
            <span className="workflow-number">02</span>
            <div className="workflow-copy">
              <h3>Write it down</h3>
              <p>
                With the beat looping, we grab a piece of paper and write. We like to keep it quick: our shortest songs took about 10 minutes, and our longest around 35.
              </p>
            </div>
          </li>
          <li>
            <span className="workflow-number">03</span>
            <div className="workflow-copy">
              <h3>Record the song</h3>
              <p>
                Once everyone is ready, we aim for as few takes as possible. When we can get all the words right, we add a catchy or weird chorus and some ad-libs.
              </p>
            </div>
          </li>
          <li>
            <span className="workflow-number">04</span>
            <div className="workflow-copy">
              <h3>Shoot the video</h3>
              <p>Our CameraLady captures us in a single take, keeping things as natural and weird as they come.</p>
            </div>
          </li>
          <li>
            <span className="workflow-number">05</span>
            <div className="workflow-copy">
              <h3>Mix and release</h3>
              <p>
                Martin Aston brings it all together with his mixing skills, and the finished song and video are ready to release in a very short time.
              </p>
            </div>
          </li>
        </ol>
        <p className="about-outro">
          We love our Fiats: they are funny to make, but the workflow is part of what makes them feel right, so we try not to disrupt it. You will hear Italian, English, Italian dialects, and a little Spanish in our songs. We have not had an international guest feature yet, but brothers and sisters from anywhere are very welcome. We would love to rap in more languages together.
        </p>
      </section>

    </main>
  )
}

function CrewPage() {
  return (
    <main>
      <section className="crew-section crew-page" aria-labelledby="crew-title">
        <p className="eyebrow">The people behind the tracks</p>
        <h1 id="crew-title">Meet the crew</h1>
        <p className="crew-intro">The artists and collaborators who bring each FIAT to life.</p>
        <ul className="crew-list">
          {crew.map((member) => (
            <li className={`crew-member ${member.featured ? 'crew-member-featured' : ''}`} key={member.name}>
              <div className="crew-identity">
                {member.image ? (
                  <img className={`crew-image${member.monochrome ? ' crew-image-monochrome' : ''}`} src={member.image} alt={`${member.name} portrait`} loading="lazy" />
                ) : (
                  <div className="crew-avatar-placeholder" role="img" aria-label={`Anonymous profile icon for ${member.name}`}>
                    <span className="anonymous-icon" aria-hidden="true" />
                  </div>
                )}
                <h2>{member.name}</h2>
                <p className="crew-role">{member.role}</p>
              </div>
              <div className="crew-details">
                <p className="crew-tagline">{member.tagline}</p>
                <p className="crew-bio">{member.description}</p>
                {member.style && <p><strong>Style:</strong> {member.style}</p>}
                {member.influences && <p><strong>Influences:</strong> {member.influences}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

const minigameOptions = [
  { id: 'lyrics', number: '01', title: 'Guess the lyrics', description: 'Fill in the missing line from a song.' },
  { id: 'artist', number: '02', title: 'Guess the artist', description: 'Name the artist behind a short lyric excerpt.' },
  { id: 'song', number: '03', title: 'Guess the song', description: 'Identify the song from a few lyric words.' },
]

function MinigamesPage() {
  const [selectedGame, setSelectedGame] = useState(null)

  return (
    <main>
      <section className="minigames-page" aria-labelledby="minigames-title">
        <div className="minigames-heading">
          <div>
            <p className="eyebrow">The FIAT archive</p>
            <h1 id="minigames-title">Minigames</h1>
            <p className="minigames-intro">Pick a game.</p>
          </div>
        </div>

        {selectedGame ? (
          <>
            <button className="back-to-minigames" type="button" onClick={() => setSelectedGame(null)}>
              ← All minigames
            </button>
            {selectedGame === 'lyrics' && <GuessLyricsGame />}
            {selectedGame === 'artist' && <GuessArtistGame />}
            {selectedGame === 'song' && <GuessSongGame />}
          </>
        ) : (
          <div className="minigame-choices" aria-label="Choose a minigame">
            {minigameOptions.map((game) => (
              <button
                className="minigame-choice"
                key={game.id}
                type="button"
                onClick={() => setSelectedGame(game.id)}
              >
                <span className="minigame-choice-number">{game.number}</span>
                <span className="minigame-choice-copy">
                  <strong>{game.title}</strong>
                  <span>{game.description}</span>
                </span>
                <span className="minigame-choice-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function GuessLyricsGame() {
  const [challenge, setChallenge] = useState(() => pickLyricChallenge())
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const checkAnswer = (event) => {
    event.preventDefault()
    if (!answer.trim() || result !== null) return

    const correct = isSimilarAnswer(answer, challenge.answer)
    setResult(correct)
    setAttempts((currentAttempts) => currentAttempts + 1)
    if (correct) setScore((currentScore) => currentScore + 1)
  }

  const nextChallenge = () => {
    setChallenge(pickLyricChallenge(challenge.id))
    setAnswer('')
    setResult(null)
  }

  return (
    <section aria-labelledby="lyrics-game-title">
      <div className="minigame-secondary-heading">
        <div>
          <p className="eyebrow">01 / Wordplay</p>
          <h2 id="lyrics-game-title">Guess the lyrics</h2>
          <p>One line is missing. Can you fill in the gap?</p>
        </div>
        <div className="minigame-score" aria-live="polite">
          <span>Score</span>
          <strong>{score}/{attempts}</strong>
        </div>
      </div>

      <section className="lyric-game" aria-label="Guess the lyrics game">
        <p className="lyric-game-song">FIAT / {challenge.songTitle}</p>
        <div className="lyric-prompt" aria-live="polite">
          <p>{challenge.previousLine}</p>
          <p
            className={`lyric-gap${result === null ? '' : result ? ' is-correct' : ' is-incorrect'}`}
            aria-label={result === null ? 'Missing lyric line' : 'Revealed lyric line'}
          >
            {result === null ? '________________________' : challenge.answer}
          </p>
          <p>{challenge.nextLine}</p>
        </div>

        {result === null ? (
          <form className="lyric-answer-form" onSubmit={checkAnswer}>
            <label htmlFor="lyric-answer">Your line</label>
            <div className="lyric-answer-controls">
              <input
                id="lyric-answer"
                type="text"
                autoComplete="off"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Type the missing line"
              />
              <button type="submit" disabled={!answer.trim()}>Check answer</button>
            </div>
            <p className="lyric-answer-hint">Minor typos and very close wording count.</p>
          </form>
        ) : (
          <div className={`lyric-result ${result ? 'is-correct' : 'is-incorrect'}`} aria-live="polite">
            <p>{result ? 'Correct!' : 'Not quite.'}</p>
            <button type="button" onClick={nextChallenge}>Next line</button>
          </div>
        )}
      </section>
    </section>
  )
}

  function GuessArtistGame() {
    const [challenge, setChallenge] = useState(() => pickArtistChallenge())
    const [answer, setAnswer] = useState('')
    const [result, setResult] = useState(null)
    const [score, setScore] = useState(0)
    const [attempts, setAttempts] = useState(0)

    const checkAnswer = (event) => {
      event.preventDefault()
      if (!answer.trim() || result !== null) return

      const correct = isSimilarAnswer(answer, challenge.artist, 0.90)
      setResult(correct)
      setAttempts((currentAttempts) => currentAttempts + 1)
      if (correct) setScore((currentScore) => currentScore + 1)
    }

    const nextChallenge = () => {
      setChallenge(pickArtistChallenge(challenge.id))
      setAnswer('')
      setResult(null)
    }

    return (
      <section className="minigame-secondary-section" aria-labelledby="artist-game-title">
        <div className="minigame-secondary-heading">
          <div>
            <p className="eyebrow">02 / Who said it?</p>
            <h2 id="artist-game-title">Guess the artist</h2>
            <p>Read a few words and name the artist behind them.</p>
          </div>
          <div className="minigame-score" aria-live="polite">
            <span>Score</span>
            <strong>{score}/{attempts}</strong>
          </div>
        </div>

        <div className="lyric-game artist-guess-panel">
          <p className="lyric-game-song">FIAT / {challenge.songTitle}</p>
          <blockquote className="minigame-snippet">{challenge.snippet}</blockquote>

          {result === null ? (
            <form className="lyric-answer-form" onSubmit={checkAnswer}>
              <label htmlFor="artist-answer">Who wrote this?</label>
              <div className="lyric-answer-controls">
                <input
                  id="artist-answer"
                  type="text"
                  autoComplete="off"
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  placeholder="Type an artist name"
                />
                <button type="submit" disabled={!answer.trim()}>Check answer</button>
              </div>
              <p className="lyric-answer-hint">Minor spelling mistakes count.</p>
            </form>
          ) : (
            <div className={`lyric-result ${result ? 'is-correct' : 'is-incorrect'}`} aria-live="polite">
              <p>{result ? 'Correct artist:' : 'Not quite. The artist was:'}</p>
              <p className="minigame-answer-reveal">{challenge.artist}</p>
              <button type="button" onClick={nextChallenge}>Next excerpt</button>
            </div>
          )}
        </div>
      </section>
    )
  }

function GuessSongGame() {
  const [challenge, setChallenge] = useState(() => pickArtistChallenge())
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const checkAnswer = (event) => {
    event.preventDefault()
    if (!answer.trim() || result !== null) return

    const answerWithoutFiat = answer.trim().replace(/^fiat\s+/i, '')
    const correct = isSimilarAnswer(answerWithoutFiat, challenge.songTitle, 0.92)
    setResult(correct)
    setAttempts((currentAttempts) => currentAttempts + 1)
    if (correct) setScore((currentScore) => currentScore + 1)
  }

  const nextChallenge = () => {
    setChallenge(pickArtistChallenge(challenge.id))
    setAnswer('')
    setResult(null)
  }

  return (
    <section className="minigame-secondary-section" aria-labelledby="song-game-title">
      <div className="minigame-secondary-heading">
        <div>
          <p className="eyebrow">03 / Name that FIAT</p>
          <h2 id="song-game-title">Guess the song</h2>
          <p>Read a few words and name the song they come from.</p>
        </div>
        <div className="minigame-score" aria-live="polite">
          <span>Score</span>
          <strong>{score}/{attempts}</strong>
        </div>
      </div>

      <div className="lyric-game minigame-guess-panel">
        <p className="lyric-game-song">A lyric from the archive</p>
        <blockquote className="minigame-snippet">{challenge.snippet}</blockquote>

        {result === null ? (
          <form className="lyric-answer-form" onSubmit={checkAnswer}>
            <label htmlFor="song-answer">Which song is this from?</label>
            <div className="lyric-answer-controls">
              <input
                id="song-answer"
                type="text"
                autoComplete="off"
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Type the song title"
              />
              <button type="submit" disabled={!answer.trim()}>Check answer</button>
            </div>
            <p className="lyric-answer-hint">92% similarity counts. You can include or skip “Fiat”.</p>
          </form>
        ) : (
          <div className={`lyric-result ${result ? 'is-correct' : 'is-incorrect'}`} aria-live="polite">
            <p>{result ? 'Correct song:' : 'Not quite. The song was:'}</p>
            <p className="minigame-answer-reveal">FIAT {challenge.songTitle}</p>
            <button type="button" onClick={nextChallenge}>Next excerpt</button>
          </div>
        )}
      </div>
    </section>
  )
}

function SiteFooter() {
  const handleBackToTop = (event) => {
    event.preventDefault()
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    if (document.documentElement) {
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
    if (document.body) {
      document.body.scrollTop = 0
    }
  }

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-contact">
        <p className="eyebrow">Stay in the loop</p>
        <h2>Contact us</h2>
        <p className="contact-copy">
          Eager to feature on one of our songs? Get in touch and tell us a little about your sound. Brothers and sisters from anywhere in the world are very welcome; we love rapping in more languages and discovering new voices.
        </p>
        <a className="footer-email" href="mailto:marcovava2001@gmail.com">
          Mai Barzotto · marcovava2001@gmail.com
        </a>
      </div>
      <a href="#" className="back-to-top" onClick={handleBackToTop}>Back to top ↑</a>
      <div className="footer-meta">
        <span>© {new Date().getFullYear()} FIAT. All rights reserved.</span>
        <span>
          Developed by{' '}
          <strong>
            <a href="https://cricketdev.github.io/cricket-dev-website/" target="_blank" rel="noreferrer">
              CricketDev
            </a>
          </strong>
        </span>
      </div>
    </footer>
  )
}

function App() {
  return (
    <HashRouter>
      <ScrollToLocation />
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/crew" element={<CrewPage />} />
        <Route path="/minigames" element={<MinigamesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <SiteFooter />
    </HashRouter>
  )
}

export default App