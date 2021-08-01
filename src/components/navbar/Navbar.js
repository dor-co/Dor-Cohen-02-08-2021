import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

    return (
        <nav>
            <h3>logo</h3>
            <ul className='nav-link'>
                <Link className='link' to='/'>
                    <li>weather</li>
                </Link>
                <Link className='link' to='/favorite'>
                    <li>Favorite</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Navbar;