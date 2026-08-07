import siteProperties from '../data/siteproperties.json';
import aboutData from '../data/aboutme.json';
import { useInView } from './hooks';

/** Turn the stored Google appointment URL into an embeddable schedule URL. */
function toEmbed(url) {
  if (!url) return '';
  const base = url.replace('/u/0/appointments', '/appointments');
  return base.includes('?') ? `${base}&gv=true` : `${base}?gv=true`;
}

/** Section 03 — Book a meeting. Inline Google scheduling + emerald CTA. */
export default function BookScene() {
  const [ref, inView] = useInView();
  const embed = toEmbed(siteProperties.calendlyUrl);
  const cta = aboutData.bookingUrl || siteProperties.calendlyUrl;

  return (
    <section className={`reveal${inView ? ' in-view' : ''}`} id="book" ref={ref}>
      <p className="reveal__num" data-anim>
        03 — Meet
      </p>
      <h2 className="reveal__title" data-anim data-delay="1">
        Book a meeting
      </h2>
      <p className="reveal__lead" data-anim data-delay="2">
        Have an automation problem or a build in mind? Bring the vision — we’ll keep
        the human at the center.
      </p>

      {embed && (
        <div className="book-wrap" data-anim="scale" data-delay="1">
          <iframe
            title="Book a meeting with Jianyin Roachell"
            src={embed}
            style={{ width: '100%', height: '640px', border: 0 }}
            loading="lazy"
          />
        </div>
      )}

      <div className="book-cta" data-anim data-delay="2">
        <a href={cta} target="_blank" rel="noreferrer">
          Book a meeting →
        </a>
      </div>
    </section>
  );
}
