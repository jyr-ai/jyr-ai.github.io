import './cinematic.css';
import { useLenis } from './hooks';
import Hero from './Hero';
import AboutStrip from './AboutStrip';
import ProjectsScene from './ProjectsScene';
import WritingScene from './WritingScene';
import BookScene from './BookScene';
import siteProperties from '../data/siteproperties.json';

/** Root of the cinematic scroll experience mounted on the "/" route. */
export default function CinematicHome() {
  useLenis(true);

  const scrollTo = (e, selector) => {
    e.preventDefault();
    const el = document.querySelector(selector);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -60 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  const social = siteProperties.socialProfiles || {};
  const year = new Date().getFullYear();

  return (
    <div className="cine">
      <nav className="cine-nav">
        <a className="cine-nav__brand" href="#home" onClick={(e) => scrollTo(e, '#home')}>
          JYR<b>-AI</b>
        </a>
        <div className="cine-nav__links">
          <a href="#projects" onClick={(e) => scrollTo(e, '#projects')}>
            Projects
          </a>
          <a href="#writing" onClick={(e) => scrollTo(e, '#writing')}>
            Writing
          </a>
          <a href="#about" onClick={(e) => scrollTo(e, '#about')}>
            About
          </a>
          <a className="is-cta" href="#book" onClick={(e) => scrollTo(e, '#book')}>
            Book
          </a>
        </div>
      </nav>

      <main>
        <Hero />
        <AboutStrip />
        <ProjectsScene />
        <WritingScene />
        <BookScene />
      </main>

      <footer className="cine-footer">
        <div className="cine-footer__brand">
          JYR<b>-AI</b>
        </div>
        <div className="cine-footer__links">
          {social.linkedIn && (
            <a href={social.linkedIn} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {social.gitHub && (
            <a href={social.gitHub} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {social.substack && (
            <a href={social.substack} target="_blank" rel="noreferrer">
              Substack
            </a>
          )}
        </div>
        <div className="cine-footer__fine">
          © {year} Jianyin Roachell · Human-centered AI for creatives · Built with a
          Vitruvian eye.
        </div>
      </footer>
    </div>
  );
}
