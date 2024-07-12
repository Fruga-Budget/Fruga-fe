import Fruga from "../assets/Fruga-img.jpeg"
import "./Header.css"
import { Link } from "react-router-dom"
function Header(){
    return(
        <header className="header">
            <div className="app-name">
                <div className="img">
                    <img src={Fruga} className="logo" alt="fruga-img"/>
                </div>
                <div className="title">
                    <h1>Fruga Budget</h1>
                </div>
            </div>
            <div className="log-in">
                <Link to={"/log-in"}>
                    <button disabled className="user-log">Returning User? Log in here!</button>
                </Link>
            </div>
        </header>
    )
}
export default Header