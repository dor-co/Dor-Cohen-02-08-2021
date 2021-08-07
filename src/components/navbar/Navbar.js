import React from 'react';
import { Link } from 'react-router-dom';
import './Style.css';
import * as MdIcons from 'react-icons/md';
import { useSelector, useDispatch } from "react-redux";

function Navbar({modeSetting}) {
    const modeRed = useSelector((state) => state.modeToggle);

    return (
        <nav className={modeSetting ? ('navStyleDark') : ('navStyleLight')}>
            <h3 className='logoNavbar'><MdIcons.MdCloudQueue size={50} /></h3>
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