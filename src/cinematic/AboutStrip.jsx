import aboutData from '../data/aboutme.json';
import feature from '../data/projectfeature.json';
import { useInView } from './hooks';

/** The human behind JYR-AI: portrait + bio + capability chips. */
export default function AboutStrip() {
  const [ref, inView] = useInView();
  return (
    <section className={`reveal${inView ? ' in-view' : ''}`} id="about" ref={ref}>
      <div className="about">
        <div className="about__portrait" data-anim="left">
          <img
            src={feature.portraitImage.src}
            alt={feature.portraitImage.alt || 'Jianyin Roachell'}
            loading="lazy"
          />
        </div>
        <div>
          <p className="reveal__num" data-anim>
            The human
          </p>
          <p className="about__body" data-anim data-delay="1">
            {feature.callToAction}
          </p>
          <p
            className="about__body"
            data-anim
            data-delay="2"
            style={{ fontSize: '1.15rem', color: 'var(--muted)', marginTop: '1.4rem' }}
            dangerouslySetInnerHTML={{ __html: aboutData.description }}
          />
          <div className="about__skills" data-anim data-delay="3">
            {aboutData.skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
