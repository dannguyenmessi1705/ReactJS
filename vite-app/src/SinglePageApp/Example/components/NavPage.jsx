import {NavLink, Link} from 'react-router-dom'
function NavPage() {
    return (
        <ul>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/product">Product</NavLink>
            </li>
            <li>
                <Link to="/price">Price</Link>
            </li>
        </ul>
    )
}

export default NavPage
