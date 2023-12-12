// FavoriteCities.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {


    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light ">
                <a class="navbar-brand mx-3" href="#">Weather</a>
                <div >
                    <div class="navbar-nav">
                        <Link className="nav-item nav-link active" to='/' >Home </Link>
                        <Link className="nav-item nav-link active" to="/favorites">Favorite Cities</Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
