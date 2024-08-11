import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import supabase from "../client";

export default function ViewCreator() {
  // Extract the 'id' parameter from the URL
  // Here the type of the 'id' we get from useParams() is a 'String'
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch creator data when the component mounts or 'id' changes
  useEffect(() => {
    // Fetch the creator data from the 'creators' table where the id matches
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", Number(id)) // Convert String to Integer
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
      } else {
        setCreator(data);
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("creators")
      .delete()
      .eq("id", Number(id));

    if (error) {
      console.error("Error deleting creator: ", error);
    } else {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <main className="container">
        <p style={{ textAlign: "center" }}>Loading...</p>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="card-container">
        <div className="card-container__image">
          <img
            src={creator.imageURL ? creator.imageURL : "/default-image.png"}
            alt={creator.name}
          />
        </div>
        <div className="card-container__details">
          <div className="card-container__info">
            <h1>{creator.name}</h1>
            <p>{creator.description}</p>

            {creator.youtubeHandle && (
              <a
                href={`https://youtube.com/${creator.youtubeHandle}`}
                target="__blank"
              >
                <ion-icon name="logo-youtube"></ion-icon> @
                {creator.youtubeHandle}
              </a>
            )}
            {creator.twitterHandle && (
              <a
                href={`https://twitter.com/${creator.twitterHandle}`}
                target="__blank"
              >
                <ion-icon name="logo-twitter"></ion-icon> @
                {creator.twitterHandle}
              </a>
            )}
            {creator.instagramHandle && (
              <a
                href={`https://instagram.com/${creator.instagramHandle}`}
                target="_blank"
              >
                <ion-icon name="logo-instagram"></ion-icon> @
                {creator.instagramHandle}
              </a>
            )}
          </div>

          {/* The issue I encountered was, where the edit page is appending to the view page path:
              This is typically due to the way relative paths are handled in React Router.
              When you use a relative path in the navigate function on in a link, it appends to the current path instead of replacing it.

              To ensure that the path is absolute and not relative, you should start the path with a '/'.
              This makes it clear that you want to navigate to the root of the path structure.

              Here's a quick rundown of what might be happening and how to fix it:

              Problem: If you navigate using a relative path, like creators/edit/${id}, it will append to the current path. 
              For example, if you are currently at /creators/7, navigating to creators/edit/7 will result in /creators/7/creators/edit/7.

              Solution: To avoid this, make sure you use an absolute path by starting it with a /.
          */}
          <div className="card-container_btns">
            <Link to={`/creators/edit/${creator.id}`} className="edit">
              Edit
            </Link>

            {/* FIXME: Update Links below */}
            <button className="delete" onClick={() => handleDelete(id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
