import { Link } from "react-router-dom";

export default function CreatorCard({ creator }) {
  return (
    <div className="creator-card">
      {/* Creator Image */}
      <div className="creator-card__img">
        <img
          src={
            creator.imageURL ? creator.imageURL : "./public/default-image.png"
          }
          alt="creator"
        />
      </div>

      {/* Creator Title and Description */}
      <div className="creator-card__info">
        <h3 className="creator-card__title">{creator.name}</h3>
        <p className="creator-card__text">
          {creator.description
            ? creator.description.length > 90
              ? creator.description.slice(0, 90) + "..."
              : creator.description
            : "No description available"}
        </p>
      </div>

      {/* Creator Links and Social Media Icons */}
      <div className="creator-card__links">
        <div className="creator-card__infoedit">
          {/* When clicked 'Info' button the page will be navigated to: '/creators/:id' */}
          <Link to={`creators/${creator.id}`} className="info">
            Info
          </Link>

          <Link to="" className="edit">
            Edit
          </Link>
        </div>

        {/* TODO: Based on the social media handles display the icons */}
        <div className="creator-card__social">
          <a href="https://youtube.com">
            <ion-icon name="logo-youtube"></ion-icon>
          </a>
          <a href="https://twitter.com">
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
          <a href="https://instagram.com">
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
        </div>
      </div>
    </div>
  );
}
