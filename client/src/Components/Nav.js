import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <div>
            <NavLink to = '/add'>
                Add Activity
            </NavLink>
            <NavLink to = '/about'>
                About
            </NavLink>
        </div>
    )
};

export default Nav;