import { useEffect } from 'react'
import { HashRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
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
    role: 'Co-founder · Artist · Mixing',
    description: 'Co-founded FIAT, performs on the songs, and mixes the finished tracks.',
  },
  {
    name: 'Piccolo Str*nzo',
    role: 'Co-founder · Artist',
    description: 'Co-founded FIAT and is one of the voices at the heart of the project.',
  },
  {
    name: 'Mai Barzotto',
    role: 'Artist',
    description: 'A regular voice in the collection, including Fiat Penny and Fiat Idea.',
  },
  {
    name: 'Lucian',
    role: 'Collaborating artist',
    description: 'Featured on Fiat Grande Punto.',
  },
  {
    name: 'Loris Caldo',
    role: 'Collaborating artist',
    description: 'Featured on Fiat Multipla.',
  },
  {
    name: 'CameraLady',
    role: 'Videographer',
    description: 'Captures the videos in one take, keeping each shoot natural and spontaneous.',
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
        <span className="header-note">Rap archive / Est. together</span>
      </header>
      <nav className="site-nav" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About FIAT</NavLink>
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
          <h1 id="intro-title">Made together.<br />Kept forever.</h1>
          <p className="intro-description">
            A home for every track, idea, and moment we put into the music.
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
          <span className="collection-count">12 tracks</span>
        </div>
        <ol className="track-list">
          {tracks.map((track, index) => (
            <li className="track-row" key={track.videoId}>
              <span className="track-number">{String(index + 1).padStart(2, '0')}</span>
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

      <section className="crew-section" aria-labelledby="crew-title">
        <p className="eyebrow">The people behind the tracks</p>
        <h2 id="crew-title">Meet the crew</h2>
        <ul className="crew-list">
          {crew.map((member) => (
            <li className="crew-member" key={member.name}>
              <h3>{member.name}</h3>
              <p className="crew-role">{member.role}</p>
              <p>{member.description}</p>
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
        <Route path="*" element={<HomePage />} />
      </Routes>
      <SiteFooter />
    </HashRouter>
  )
}

export default App