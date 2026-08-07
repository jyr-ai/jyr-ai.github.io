import projectsData from '../data/projects.json';
import { useInView } from './hooks';

const CLIP = 'videos/creator-studio.mp4';

/** Section 01 — Projects. Creator-studio clip + grouped project index. */
export default function ProjectsScene() {
  const [ref, inView] = useInView();
  return (
    <section className={`reveal${inView ? ' in-view' : ''}`} id="projects" ref={ref}>
      <p className="reveal__num" data-anim>
        01 — Build
      </p>
      <h2 className="reveal__title" data-anim data-delay="1">
        Projects
      </h2>
      <p className="reveal__lead" data-anim data-delay="2">
        Where the human meets the machine — agents, forecasts and tools built to
        amplify creative work, not replace it.
      </p>

      <div className="scene" style={{ marginBottom: '3.5rem' }}>
        <div className="scene__copy" data-anim="left" data-delay="1">
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            The builder at the terminal — between panels of code and craft, a studio
            where research becomes product.
          </p>
        </div>
        <div className="scene__media" data-anim="right" data-delay="2">
          <video
            src={CLIP}
            poster="images/jyr-ai_reseacherAI.png"
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
          />
        </div>
      </div>

      {projectsData.map((group) => (
        <div className="proj-group" key={group.category}>
          <p className="proj-group__cat" data-anim>
            {group.category}
          </p>
          {group.projects.map((project) => (
            <a
              className="proj-card"
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              data-anim
              data-delay="1"
            >
              <img
                className="proj-card__thumb"
                src={`images/${project.img}`}
                alt={project.title}
                loading="lazy"
              />
              <div>
                <h3 className="proj-card__title">{project.title}</h3>
                <p className="proj-card__desc">{project.description}</p>
              </div>
              <span className="proj-card__go" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      ))}
    </section>
  );
}
