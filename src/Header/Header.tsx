import Fruga from "../assets/Fruga-img.jpeg"
import "./Header.css"
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
                <h3>Log In</h3>
            </div>
        </header>
    )
}
export default Header