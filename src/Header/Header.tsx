import Fruga from "../assets/frugabird.jpeg";
import "./Header.css";
import { Link } from "react-router-dom";

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

function Header({ isLoggedIn, onLogout }: HeaderProps) {
  return (
    <header className="header">
      <div className="app-name">
        <div className="img">
            <Link to={"/"}>
                <img src={Fruga} className="logo" alt="fruga-img" />
            </Link>
        </div>
        <div className="title">
          <h1>Fruga Budget</h1>
        </div>
      </div>
      <div className="header-buttons">
        {isLoggedIn ? (
          <>
            <div className="log-in">
              <button className="user-log" onClick={onLogout}>
                Logout
              </button>
            </div>
            <div className="log-in">
              <Link to="/saved-budgets">
                <button className="user-log">Saved Budgets</button>
              </Link>
            </div>
          </>
        ) : (
          <div className="log-in">
            <Link to="/log-in">
              <button className="user-log">Returning User? Log in here!</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
