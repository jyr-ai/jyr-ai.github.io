import { PropTypes } from 'prop-types';
import './Card.css';

const Card = ({ project }) => (
  <div className={`project-card ${project['icon-overlay'] ? 'featured' : ''}`}>
    <div className="content-wrapper">
      <div className="title-section">
        <div className="title-container">
          <h3>{project.title}</h3>
        </div>
      </div>
      {project.img && (
        <div className="image-section">
          {project.url.includes('https://www.youtube.com/watch?v=Zyd75DVX5PY&ab_channel=JianyinRoachell') ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <img src={project.img} alt={project.title} />
            </a>
          ) : (
            <img src={`/images/${project.img}`} alt={project.title} />
          )}
        </div>
      )}
      <div className={`body-section ${project.img ? 'with-image' : ''}`}>
        <p>{project.description}</p>
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="button">
          View Project
        </a>
      </div>
    </div>
    {project['icon-overlay'] && (
      <img
        src={`/images/${project['icon-overlay']}`}
        alt="Icon Overlay"
        className="icon-overlay"
      />
    )}
  </div>
);

Card.propTypes = {
  project: PropTypes.object.isRequired,
};

export default Card;
