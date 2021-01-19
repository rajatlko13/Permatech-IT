import React, { Component } from 'react';
import http from '../utilities/http';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Products extends Component {
    state = { 
        products: [],
        quantity: []
    }

    async componentDidMount() {
        try {
            const products = await http.get('/product');
            const quantity =[];
            for (let i = 0; i < products.data.length; i++) 
                quantity[i] = 0;
            this.setState({products: products.data, quantity});
        } catch (error) {
            console.log("error-",error);
        }
    }

    incrementQuantity = (key) => {
        const quantity = this.state.quantity;
        quantity[key]++;
        this.setState({quantity});
    }

    decrementQuantity = (key) => {
        const quantity = this.state.quantity;
        quantity[key]--;
        this.setState({quantity});
    }

    confirmOrder = async () => {

        try {
            const orders = [];
            const { products, quantity} = this.state;
            for (let i = 0; i < products.length; i++) {
                if(quantity[i]>0) {
                    const order = {
                        product: products[i]._id,
                        quantityOrdered: quantity[i]
                    }
                    orders.push(order);
                }  
            }
            console.log(orders);
            if(orders.length>0) {
                const res = await http.post(`/order/${this.props.match.params.id}`, orders);
                for (let i = 0; i < this.state.products.length; i++) 
                        quantity[i] = 0;
                this.setState({quantity});
                toast.success("Order Placed");
            }
            else
                toast.error("Add atleast 1 product to the basket");
        } catch (error) {
            console.log("error-",error);
            toast.error("Unexpected Error");
        }
        
    }

    renderProducts = () => {
        return this.state.products.map((product,key) => {
            return (<div className="m-4 p-1" id={key}>
                        <h4>{product.name}</h4>
                        <button className="btn btn-success mr-2 py-0 px-2" onClick={() => this.incrementQuantity(key)}>+</button>
                        <button className="btn btn-danger py-0 px-2" disabled={this.state.quantity[key]<=0} onClick={() => this.decrementQuantity(key)}>-</button>
                        <p>Quantity : {this.state.quantity[key]}</p>
                    </div>)
        })
    }

    render() { 
        return ( 
            <div className="container my-3">
                <ToastContainer/>
                <h3>Product List</h3>
                <div>
                    {this.renderProducts()}
                </div>
                <button className="btn btn-primary" onClick={this.confirmOrder}>Confirm Order</button>
            </div>
         );
    }
}
 
export default Products;