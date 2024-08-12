import React from "react";

function CreatorForm({ creator, handleChange }) {
  return (
    <form action="">
      {/* name */}
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={creator.name}
          onChange={handleChange}
        />
      </div>

      {/* imageURL */}
      <div className="form-field">
        <label htmlFor="imageURL">
          Image
          <p>
            Provide a link to an image of your creator. Be sure to include the
            http://
          </p>
        </label>

        <input
          type="text"
          name="imageURL"
          id="imageURL"
          value={creator.imageURL}
          onChange={handleChange}
        />
      </div>

      {/* description */}
      <div className="form-field">
        <label htmlFor="description">
          Description
          <p>
            Provide a description of the creator. Who are they? What makes them
            interesting?
          </p>
        </label>

        <textarea
          type="text"
          rows={4}
          name="description"
          id="description"
          value={creator.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <h2>Social Media Links</h2>
        <p>Provide at least one of the creator's social media links.</p>
      </div>

      {/* youtubeHandle */}
      <div className="form-field">
        <label htmlFor="youtubeHandle">
          <span>
            <ion-icon name="logo-youtube"></ion-icon>
          </span>
          YouTube
          <p>The creator's YouTube handle (without the @)</p>
        </label>

        <input
          type="text"
          name="youtubeHandle"
          id="youtubeHandle"
          value={creator.youtubeHandle}
          onChange={handleChange}
        />
      </div>

      {/* twitterHandle */}
      <div className="form-field">
        <label htmlFor="twitterHandle">
          <span>
            <ion-icon name="logo-twitter"></ion-icon>
          </span>
          Twitter<p>The creator's Twitter handle (without the @)</p>
        </label>

        <input
          type="text"
          name="twitterHandle"
          id="twitterHandle"
          value={creator.twitterHandle}
          onChange={handleChange}
        />
      </div>

      {/* instagramHandle */}
      <div className="form-field">
        <label htmlFor="instagramHandle">
          <span>
            <ion-icon name="logo-instagram"></ion-icon>
          </span>
          Instagram<p>The creator's Instagram handle (without the @)</p>
        </label>

        <input
          type="text"
          name="instagramHandle"
          id="instagramHandle"
          value={creator.instagramHandle}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}

export default CreatorForm;
