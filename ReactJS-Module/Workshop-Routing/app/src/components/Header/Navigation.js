import { Link } from "react-router-dom";
import { onLogout } from "../../service/apiRequest";


export function Navigation({ user, setUser }) {

    function onClickLogout() {
        onLogout();
        setUser(null);
    }

    return (
        <nav>
            <div>
                <Link to="/catalog">Dashboard</Link>
            </div>
            {user ?
                <div className="user">
                    <Link to="/create">Create Offer</Link>
                    <Link onClick={onClickLogout} to="#">Logout</Link>
                </div> :
                <div className="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            }
        </nav>
    )
}