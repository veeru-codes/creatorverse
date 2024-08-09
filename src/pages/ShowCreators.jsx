import { useState, useEffect } from "react";
import supabase from "../client";
import CreatorCard from "../components/CreatorCard";

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase.from("creators").select("*");

      if (error) {
        console.error("Error fetching creators:", error);
      } else {
        setCreators(data);
      }

      setLoading(false);
    };

    fetchCreators();
  });

  if (loading) {
    return (
      <main className="container">
        <p style={{ textAlign: "center" }}>Loading...</p>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="cards-container">
        {creators.length > 0 ? (
          creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))
        ) : (
          <p style={{ textAlign: "center" }}>
            Oops! You don't have any creators yet. Try adding one by clicking
            &nbsp;<code>Add a creator</code> <span>👆</span>.
          </p>
        )}
      </div>
    </main>
  );
}
