import Fruga from "../assets/frugabird.jpeg";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    navigate('/log-in');
  };

  return (
    <header className="header">
      <div className="app-name">
        <div className="img">
          <img src={Fruga} className="logo" alt="fruga-img" />
        </div>
        <div className="title">
          <h1>Fruga Budget</h1>
        </div>
      </div>
      <div className="header-buttons">
        <div className="log-in">
          {isLoggedIn ? (
            <button className="user-log" onClick={handleLogout}>Logout</button>
          ) : (
            <Link to={"/log-in"}>
              <button className="user-log">Returning User? Log in here!</button>
            </Link>
          )}
        </div>
        {isLoggedIn && (
          <div className="log-in">
            <Link to={"/saved-budgets"}>
              <button className="user-log">Saved Budgets</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
