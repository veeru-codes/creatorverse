import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>Creatorverse</h2>
      <div className="nav-btns">
        <Link to="/" className="btn btn-view">
          View all creators
        </Link>
        <Link to="/new" className="btn btn-create">
          Add a creator
        </Link>
      </div>
    </nav>
  );
}
