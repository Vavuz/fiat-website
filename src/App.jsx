import './App.css'

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
            <span className="collection-count">No tracks yet</span>
          </div>
          <div className="empty-state">
            <span className="empty-mark" aria-hidden="true">F</span>
            <p>The first track is on its way.</p>
          </div>
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
