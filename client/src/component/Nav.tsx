import React from 'react'
import { Link ,NavLink } from "react-router-dom";

function Nav() {
    return (
        <div>
            <NavLink to="/" activeClassName="hurray">
                Home
            </NavLink>
            <NavLink to="/about" activeClassName="hurray">
                About
            </NavLink>
        </div>
    )
}

export default Nav
