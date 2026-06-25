import React from 'react';
import './navBar.css';
import {Link} from 'react-router-dom';

const NavBar = () =>{
    return<> <nav>
        <Link to="/">
       <div>
         <img src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png" alt="Github logo" />
         <h2>GitHub</h2>
       </div>
       </Link>
       <div>
        <Link to="/create"><p>Create a Repository</p></Link>
        <Link to="/profile"><p>Profile</p></Link>
       </div>
    </nav>
    </>
};
export default NavBar;