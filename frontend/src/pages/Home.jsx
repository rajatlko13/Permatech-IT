import React, { Component } from 'react';
import CustomerTable from '../components/CustomerTable';

class Home extends Component {

    render() { 
        return ( 
            <React.Fragment>
                <h3 className="mx-2 my-2">Welcome to Home Page</h3>
                <div className="container d-flex justify-content-between">
                    <CustomerTable/>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Home;