import { createRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../client";
import CreatorForm from "../components/CreatorForm";
import Button from "../components/Button";

export default function AddCreator() {
  // useNavigate hook to programmatically navigate
  const navigate = useNavigate();

  // State to manage form inputs
  const [creator, setCreator] = useState({
    name: "",
    description: "",
    imageURL: "",
    youtubeHandle: "",
    twitterHandle: "",
    instagramHandle: "",
  });

  const handleChange = (e) => {
    setCreator((prevCreator) => ({
      ...prevCreator,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    // Insert new creator into the 'creators' table
    const { data, error } = await supabase.from("creators").insert([creator]);

    if (error) {
      console.error("Error adding creator: ", error);
    } else {
      // Redirect to the home page upon successful submission
      navigate("/");
    }
  };

  return (
    <main className="form-container">
      {/* Form for adding a new creator
          - Uses the CreatorForm component
          - Passes the creator state and the handleChange function as props
          - Handles form submission by calling the handleSubmit function
          - Redirects to the home page upon successful submission
       */}
      <CreatorForm creator={creator} handleChange={handleChange} />

      <Button className="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </main>
  );
}
