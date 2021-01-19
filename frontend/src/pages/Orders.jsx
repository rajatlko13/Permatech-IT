import React, { Component } from 'react';
import http from '../utilities/http';
import {ToastContainer, toast} from'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


class Orders extends Component {
    state = {
        originalOrders: [], 
        orders: [],
        edit: []
     }

    async componentDidMount() {
        try {
            const orders = await http.get(`/order/customer/${this.props.match.params.id}`);
            this.setState({orders: orders.data, originalOrders: orders.data});
        } catch (error) {
            console.log("error-",error);
        }
    }

    incrementQuantity = (key1,key2) => {
        const orders = [...this.state.orders];
        orders[key1].productsOrdered[key2].quantityOrdered++;
        console.log(key1,key2);
        this.setState({orders});
    }

    decrementQuantity = (key1,key2) => {
        const orders = [...this.state.orders];
        orders[key1].productsOrdered[key2].quantityOrdered--;
        console.log(key1,key2);
        this.setState({orders});
    }

    editStatus = (e,key1) => {
        const orders = [...this.state.orders];
        orders[key1].status = e.target.value;
        this.setState({orders});
    }

    editOrder = (key1) => {
        const edit = [...this.state.edit];
        edit[key1] = true;
        this.setState({edit});
    }

    saveEdit = (key1, id) => {
        const obj = {...this.state.orders[key1]};
        console.log("obj-",id,obj);
        const res = http.put(`/order/${id}`, obj);
        const edit = [...this.state.edit];
        edit[key1] = false;
        this.setState({edit});
    }

    deleteOrder = (key1, id) => {
        try {
            const obj = {...this.state.orders[key1]};
            const res = http.delete(`/order/${id}`);
            const orders = this.state.originalOrders.filter(order => order._id !== id );
            const originalOrders = [...orders];
            this.setState({orders, originalOrders});
            toast.success("Order Deleted");
        } catch (error) {
            toast.error("Unexpected error");
        }
        
        const edit = [...this.state.edit];
        edit[key1] = false;
        this.setState({edit});
    }

    cancelEdit = (key1) => {
        console.log("cancelEdit--",key1);
        const orders = this.state.originalOrders;
        // orders[key1] = {...this.state.originalOrders[key1]};
        // console.log({...this.state.originalOrders[key1]});
        const edit = [...this.state.edit];
        edit[key1] = false;
        this.setState({orders, edit});
    }

    renderData = () => {
        return this.state.orders.map((order, key1) => 
            <tr id={key1}>
                <td>{order._id}</td>
                <td>
                    {this.state.edit[key1] ? 
                        <select className="form-control" onChange={(e) => this.editStatus(e,key1)}>
                            <option>Processing</option>
                            <option>Done</option>
                        </select> :
                        <p>{order.status}</p>
                    }
                </td>
                <td>
                    {order.productsOrdered.map((product,key2) => {
                        return <table id={key2}>
                            <tbody>
                                <tr>
                                    <td>{product.product.name}</td>
                                    <td>
                                        {product.quantityOrdered}
                                        {this.state.edit[key1] && 
                                        <span>
                                            <button className="btn btn-success ml-2 mr-2 py-0 px-2" onClick={() => this.incrementQuantity(key1,key2)}>+</button>
                                            <button className="btn btn-danger py-0 px-2" disabled={product.quantityOrdered<=0} onClick={() => this.decrementQuantity(key1,key2)}>-</button>
                                        </span>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    })}
                </td>
                <td>{order.orderDate}</td>
                <td>
                    {this.state.edit[key1] ? 
                        <div><button className="btn btn-info my-1 mx-2" onClick={() => this.saveEdit(key1, order._id)}>Save</button>
                        <button className="btn btn-warning my-1" onClick={() => this.cancelEdit(key1)}>Cancel</button></div> :
                        <button className="btn btn-primary" onClick={() => this.editOrder(key1)}>Edit</button>
                    }
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => this.deleteOrder(key1, order._id)}>Delete</button>
                </td>
            </tr>
        );
    }

    render() { 
        return ( 
            <div className="container">
                <ToastContainer/>
                <h2>Order History</h2>
                <div>
                    {this.state.orders.length>0 ? 
                    <table className="table table-responsive table-striped table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Order ID</th>
                                <th scope="col">Status</th>
                                <th scope="col">Products Ordered</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderData()}
                        </tbody>
                    </table> :
                    <h3>No Orders Found</h3>
                    }   
                </div>
                
            </div>
         );
    }
}
 
export default Orders;