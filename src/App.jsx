import { useEffect } from 'react'
import { HashRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import ashPhoto from './assets/artists/ash.png'
import lorisCaldoPhoto from './assets/artists/loris caldo.png'
import lucianPhoto from './assets/artists/lucian.png'
import maiBarzottoPhoto from './assets/artists/mai barzotto.png'
import martinAstonPhoto from './assets/artists/martin aston.png'
import piccoloStronzoPhoto from './assets/artists/piccolo stronzo.png'
import './App.css'

const tracks = [
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

const crew = [
  {
    name: 'Martin Aston',
    image: martinAstonPhoto,
    role: 'Co-founder · Artist · Mixing',
    tagline: 'The baroque stream-of-consciousness technician.',
    description: 'Martin is probably the most linguistically obsessive of the group. His writing frequently abandons conventional narrative in favour of phonetic associations, unexpected connections and increasingly obscure references. Italian and English constantly bleed into each other, while literature, cinema, geography, music and general cultural trivia are thrown into the mix. His verses feel like surrealist free association disguised as technical rap.',
    style: 'Extremely dense wordplay, internal rhymes, multilingual puns, associative writing, stream of consciousness.',
    influences: 'Abstract/underground hip-hop, literary surrealism, avant-garde humour, cinema, literature and an apparently unhealthy amount of general cultural trivia.',
  },
  {
    name: 'Piccolo Str*nzo',
    image: piccoloStronzoPhoto,
    role: 'Co-founder · Artist',
    tagline: 'The blunt-force punchline rapper.',
    description: 'Where Martin tends to spiral into increasingly complicated associations, Piccolo is much more direct. His writing is built around short, aggressive setups and immediate punchlines. There\'s a lot of physicality to his imagery: fire, cars, violence, speed, bodily humour, sex and money. He repeatedly establishes himself as the guy who walks into the verse and starts causing problems.',
    style: 'Direct punchlines, aggressive humour, crude imagery, simple premises taken to absurd extremes.',
    influences: 'Battle rap, street-rap bravado, comedy rap, vulgar internet humour and classic “say something outrageous and keep escalating” writing.',
  },
  {
    name: 'CameraLady',
    role: 'Camera · Direction',
    tagline: 'The best there is',
    description: 'We do not even know what her face looks like, but even though we do not pay her, she always captures the moment with the instincts of a great director. Natural, weird, and somehow done in one take: she never needs more.',
  },
  {
    name: 'Ash',
    image: ashPhoto,
    role: 'Pet artist · Video cameo',
    tagline: 'The feline executive producer.',
    description: 'Ash appears when the moment is right, usually with no warning and absolutely no interest in doing another take. She brings quiet authority, impeccable timing and the kind of natural screen presence that cannot be taught.',
    style: 'Unscripted entrances, silent judgement, effortless star quality.',
    influences: 'Sunbeams, cardboard boxes and the ancient art of appearing exactly where she should not be.',
  },
  {
    name: 'Mai Barzotto',
    image: maiBarzottoPhoto,
    role: 'Artist',
    tagline: 'The technical vulgarist / surrealist.',
    description: 'Mai\'s writing constantly jumps between everyday Italian, obscure references, double meanings, insults, and completely deranged imagery. He seems particularly interested in making unexpected linguistic connections and pushing an idea until it becomes funny. There\'s a strong interest in wordplay, phonetics and cultural references, often mixing highbrow material with extremely crude humour. His Italian occasionally incorporates Veronese dialect and regional expressions, adding another layer to his vocabulary and humour without being a constant feature of his writing.',
    style: 'Dense wordplay, absurdist imagery, vulgar humour, cultural references, linguistic games.',
    influences: 'Italian underground rap, surrealist comedy, internet humour, Italian regional culture, literary/cultural references, and the tradition of deliberately excessive punchline writing.',
  },
  {
    name: 'Loris Caldo',
    image: lorisCaldoPhoto,
    role: 'Collaborating artist',
    tagline: 'The wildcard / crew presence.',
    description: 'There\'s less solo material from Loris here, so his individual style is harder to define. From what\'s available, he fits naturally into the crew\'s broader absurdist, chaotic and deliberately unserious aesthetic.',
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
    name: '?',
    role: 'Incoming collaborating artist',
    tagline: 'Unknown for now.',
    description: 'Coming soon',
    style: 'Unknown',
    influences: 'Unknown',
  },
]

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
            <li className="track-row" key={track.videoId}>
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
              <a
                className="track-link"
                href={`https://www.youtube.com/watch?v=${track.videoId}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Listen to ${track.title} on YouTube`}
              >
                Listen <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ol>
      </section>
    </main>
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
            <li className="crew-member" key={member.name}>
              <div className="crew-identity">
                {member.image ? (
                  <img className="crew-image" src={member.image} alt={`${member.name} portrait`} loading="lazy" />
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

function SiteFooter() {
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
      <Link to="/" className="back-to-top">Back to top ↑</Link>
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
        <Route path="*" element={<HomePage />} />
      </Routes>
      <SiteFooter />
    </HashRouter>
  )
}

export default App