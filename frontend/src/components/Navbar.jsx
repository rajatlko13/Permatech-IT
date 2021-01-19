import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';
import JobFinder from '../images/jobFinder';

class Navbar extends Component {

    render() { 

        return ( 
            <nav className="navbar navbar-expand-lg navbar-dark text-white">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{marginRight: '0'}}>Permatech IT<JobFinder width='45px' /></Link>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse ml-4" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
         );
    }
}
 
export default Navbar;