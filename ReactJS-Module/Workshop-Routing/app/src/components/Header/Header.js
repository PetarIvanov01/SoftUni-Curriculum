import { Link } from 'react-router-dom'
import { Navigation } from './Navigation'

export function Header({ user, setUser }) {


    return (
        <header>
            <Link id="logo" to='/'>
                <img id="logo-img" src="/images/logo.jpg" alt="" />
            </Link>
            <Navigation user={user} setUser={setUser} />
        </header>
    )
}