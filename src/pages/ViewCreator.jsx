import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../client";

export default function ViewCreator() {
  // Extract the 'id' parameter from the URL
  // Here the type of the 'id' we get from useParams() is a 'String'
  const { id } = useParams();
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
            src={
              creator.imageURL
                ? creator.imageURL
                : "../public/default-image.png"
            }
            alt={creator.name}
          />
        </div>
        <div className="card-container__details">
          <div className="card-container__info">
            <h1>{creator.name}</h1>
            <p>{creator.description}</p>

            {creator.youtubeHandle && (
              <a href={`https://youtube.com/${creator.youtubeHandle}`}>
                <ion-icon name="logo-youtube"></ion-icon> @
                {creator.youtubeHandle}
              </a>
            )}
            {creator.twitterHandle && (
              <a href="XXXXXXXXXXXXXXXXXXX">
                <ion-icon name="logo-twitter"></ion-icon> @
                {creator.twitterHandle}
              </a>
            )}
            {creator.instagramHandle && (
              <a href="XXXXXXXXXXXXXXXXXXXXX">
                <ion-icon name="logo-instagram"></ion-icon> @
                {creator.instagramHandle}
              </a>
            )}
          </div>
          <div className="card-container_btns">
            <a href="edit" className="edit">
              Edit
            </a>
            <a href="delete" className="delete">
              Delete
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
