import writingData from '../data/writing.json';
import { useInView } from './hooks';

/** Section 02 — Writing. Emerald data-city band + essay cards. */
export default function WritingScene() {
  const [ref, inView] = useInView();
  return (
    <section className={`reveal${inView ? ' in-view' : ''}`} id="writing" ref={ref}>
      <p className="reveal__num" data-anim>
        02 — Think
      </p>
      <h2 className="reveal__title" data-anim data-delay="1">
        Writing
      </h2>
      <p className="reveal__lead" data-anim data-delay="2">
        Essays and dispatches on Chinese innovation, geopolitics and the human
        stakes of the AI transition.
      </p>

      <div
        className="scene__media"
        data-anim="scale"
        data-delay="1"
        style={{ aspectRatio: '21 / 6', marginBottom: '3rem' }}
      >
        <img src="images/matrix_city.png" alt="Emerald data city" loading="lazy" />
      </div>

      <div className="write-grid">
        {writingData.map((item, i) => (
          <article
            className="write-card"
            key={item.title}
            data-anim
            data-delay={String((i % 3) + 1)}
          >
            <h3 className="write-card__title">{item.title}</h3>
            <p className="write-card__desc">{item.description}</p>
            <a className="write-card__link" href={item.url} target="_blank" rel="noreferrer">
              {item.buttonText} ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
