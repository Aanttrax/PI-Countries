import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/mundo-banderas.png';
import './Nav.css'

function Nav() {
    return (
        <div className = 'cont'>
            <div className = 'nav'>
                <NavLink className = 'link' to = '/home/1'>
                    <img src = {logo} alt='logo' width="50" height="50"/>
                    Home
                </NavLink>
                <NavLink className = 'link' to = '/add'>
                    Add Activity
                </NavLink>
                <NavLink className = 'link' to = '/about'>
                    About
                </NavLink>
            </div>
        </div>
    )
};

export default Nav;