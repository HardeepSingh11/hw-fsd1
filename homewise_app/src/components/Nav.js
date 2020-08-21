import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'


function Nav () { 
    return (
        <nav>
            <h3>Homewise Solutions Project</h3>
            <ul className="nav-links">
                <Link className='link' to='/'>
                    <li>Homepage</li> 
                </Link>
                <Link className='link' to='/users'>
                    <li>User List</li> 
                </Link>
            </ul>
        </nav>
    )    
}
export default Nav