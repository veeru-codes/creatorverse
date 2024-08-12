import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../client";
import CreatorForm from "../components/CreatorForm";
import Button from "../components/Button";

export default function EditCreator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // useEffect hook to fetch creator data when the component mounts or 'id' changes
  useEffect(() => {
    // Fetch the creator data from the 'creators' table where the id matches
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", Number(id))
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreator({ ...creator, [name]: value });
  };

  // Updating the creator
  const handleSubmit = async () => {
    // Update creator into the 'creators' table where the id matches
    const { data, error } = await supabase
      .from("creators")
      .update(creator)
      .eq("id", Number(id));

    if (error) {
      console.error("Error updating creator: ", error);
    } else {
      // Redirect to the home page upon successful update
      navigate("/");
    }
  };

  // Deleting the creator
  const handleDelete = async (id) => {
    const { data, error } = await supabase
      .from("creators")
      .delete()
      .eq("id", Number(id));

    if (error) {
      console.error("Error deleting creator: ", error);
    } else {
      navigate("/");
      setShowModal(false);
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
    <main className="form-container">
      {/* Form for adding a new creator
          - Uses the CreatorForm component
          - Passes the creator state and the handleChange function as props
          - Handles form submission by calling the handleSubmit function
          - Redirects to the home page upon successful submission
       */}
      <CreatorForm creator={creator} handleChange={handleChange} />

      {/* Modal to confirm deletion
          - Displays a modal when the 'Delete' button is clicked
          - Handles the deletion by calling the handleDelete function
       */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this {creator.name}?</p>
            <button onClick={() => setShowModal(false)}>Cancel</button>
            <button onClick={() => handleDelete(id)}>Delete</button>
          </div>
        </div>
      )}

      <Button className="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button className="delete" onClick={() => setShowModal(true)}>
        Delete
      </Button>
    </main>
  );
}
