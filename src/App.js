import React, { Component } from 'react';
import OrderBuilder from './containers/OrderBuilder';
import { Route, NavLink } from 'react-router-dom';
import Checkout from './containers/Checkout';

class App extends Component {
    render () {
        return (
            <div>
                <div>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/checkout">Checkout</NavLink></li>
                        <li><NavLink to="/orders">Orders</NavLink></li>
                    </ul>
                </div>
                <div className="content">
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/" exact component={OrderBuilder}/>
                </div>
            </div>
        );
    }
}

export default App;
