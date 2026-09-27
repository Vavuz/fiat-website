import './App.css'

const tracks = [
  {
    title: 'Fiat Penny',
    artists: 'Mai Barzotto, Martin Aston',
    producer: 'wxrst',
    duration: '2:08',
    videoId: '4jJDQGnC9Qg',
  },
  {
    title: 'Fiat Idea',
    artists: 'Martin Aston, Mai Barzotto',
    producer: 'wxrst',
    duration: '1:00',
    videoId: '0WDzgXFvevU',
  },
  {
    title: 'Fiat Brevetti',
    artists: 'Mai Barzotto, Martin Aston',
    producer: 'wxrst',
    duration: '2:07',
    videoId: 'xJ-CilAaf28',
  },
  {
    title: 'Fiat Grande Punto',
    artists: 'Lucian, Martin Aston, Mai Barzotto, Piccolo Str*nzo',
    producer: 'wxrst',
    duration: '3:07',
    videoId: 'cUni1qQIP6s',
  },
  {
    title: 'Fiat Oggi',
    artists: 'Mai Barzotto, Martin Aston',
    producer: 'wxrst',
    duration: '2:32',
    videoId: 'pPDDo4yNUMY',
  },
  {
    title: 'Fiat Marea',
    artists: 'Piccolo Str*nzo, Mai Barzotto, Martin Aston',
    producer: 'David Linhof',
    duration: '3:12',
    videoId: '23y07tQGG9s',
  },
  {
    title: 'Fiat Scudo',
    artists: 'Martin Aston, Piccolo Str*nzo',
    producer: 'wxrst',
    duration: '2:37',
    videoId: 'c2tjxmLgPmg',
  },
  {
    title: 'Fiat Multipla',
    artists: 'Loris Caldo, Martin Aston, Mai Barzotto',
    producer: 'wxrst',
    duration: '2:59',
    videoId: 'xWIgPdfEuoc',
  },
  {
    title: 'Fiat Marengo',
    artists: 'Piccolo Str*nzo, Martin Aston',
    producer: 'wxrst',
    duration: '2:37',
    videoId: '2GudihdRshE',
  },
  {
    title: 'Fiat Uno',
    artists: 'Mai Barzotto, Martin Aston',
    producer: 'wxrst',
    duration: '2:06',
    videoId: '8zz5M1bQoQg',
  },
  {
    title: 'Fiat Dino',
    artists: 'Martin Aston, Piccolo Str*nzo',
    producer: 'wxrst',
    duration: '2:06',
    videoId: 'jo-GiI-4QsQ',
  },
  {
    title: 'Fiat Duna',
    artists: 'Piccolo Str*nzo, Martin Aston',
    producer: 'trabbey',
    duration: '1:51',
    videoId: 'XfssLvCxvgQ',
  },
]

function App() {
  return (
    <>
      <header className="site-header" id="home">
        <a className="wordmark" href="#home" aria-label="FIAT home">
          FIAT<span className="wordmark-period">.</span>
        </a>
        <span className="header-note">Rap archive / Est. together</span>
      </header>

      <nav className="site-nav" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#about">About us</a>
        <a href="#contact">Contact us</a>
      </nav>

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

        <section className="about" id="about" aria-labelledby="about-title">
          <p className="eyebrow">Who we are</p>
          <h2 id="about-title">About FIAT</h2>
          <p>Friends making rap, sharing ideas, and building something together.</p>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div>
          <p className="eyebrow">Stay in the loop</p>
          <h2>Contact us</h2>
        </div>
        <p>More from FIAT, coming soon.</p>
        <a href="#home" className="back-to-top">Back to top ↑</a>
      </footer>
    </>
  )
}

export default App
