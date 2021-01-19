import React, { Component } from 'react';
import http from '../utilities/http';
import { Link } from 'react-router-dom';

class CustomerTable extends Component {
    state = { 
        customers: []
     }

    componentDidMount = async () => {
        const customers = await http.get("/customer");
        this.setState({customers: customers.data});
        console.log(customers.data);
    }

    renderData = () => {
        return this.state.customers.map((customer) => 
            <tr>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>
                    <Link to={`/orders/${customer._id}`}>
                        <button className="btn btn-danger">View</button>
                    </Link>
                </td>
                <td>
                    <Link to={`/placeOrder/${customer._id}`}>
                        <button className="btn btn-danger">Place Order</button>
                    </Link>
                </td>
            </tr>
        );
    }

    render() { 
        return ( 
            <div className="mx-auto">
                <table class="table table-responsive table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">View Orders</th>
                            <th scope="col">Place Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderData()}
                    </tbody>
                </table>   
            </div>
         );
    }
}
 
export default CustomerTable;