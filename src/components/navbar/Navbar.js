import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css';

function Navbar() {

    return (
        <nav>
            <h3 className='logoNavbar'>logo</h3>
            <ul className='nav-link'>
                <Link className='link' to='/'>
                    <li>Weather</li>
                </Link>
                <Link className='link' to='/favorite'>
                    <li>Favorite</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Navbar;