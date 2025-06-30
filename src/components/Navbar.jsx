import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-container">
        <h1 className="logo">NewsNet</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/summaries">Summaries</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
