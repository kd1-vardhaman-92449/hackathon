import { Link } from "react-router";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/my-quotes" className="nav-link">My Quotes</Link>
                    </li>


                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </li>

                    <li className="navbar-item">
                        <Link to="/logout" className="nav-link ">Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

