import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          StockMarket
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <Link to="/markets" className="hover:text-accent transition-colors">
            Markets
          </Link>
          <Link to="/news" className="hover:text-accent transition-colors">
            News
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;