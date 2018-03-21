import React, { Component } from 'react';
import OrderBuilder from './containers/OrderBuilder';
import { Route, NavLink } from 'react-router-dom';
import Checkout from './containers/Checkout';
import Orders from './containers/Orders';
import Auth from './containers/Auth';

class App extends Component {
    render () {
        return (
            <div>
                <div>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/checkout">Checkout</NavLink></li>
                        <li><NavLink to="/orders">Orders</NavLink></li>
                        <li><NavLink to="/authentication">Authentication</NavLink></li>
                    </ul>
                </div>
                <div className="content">
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/authentication" component={Auth}/>
                    <Route path="/" exact component={OrderBuilder}/>
                </div>
            </div>
        );
    }
}

export default App;
