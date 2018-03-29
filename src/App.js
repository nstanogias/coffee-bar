import React, { Component } from 'react';
import OrderBuilder from './containers/OrderBuilder';
import { Route, NavLink } from 'react-router-dom';
import Checkout from './containers/Checkout';
import Orders from './containers/Orders';
import Auth from './containers/Auth';
import {connect} from 'react-redux';
import Logout from "./containers/Logout";

class App extends Component {
    render () {
        return (
            <div>
                <div>
                    <ul className="header">
                        <li><NavLink exact to="/">Home</NavLink></li>
                        <li><NavLink to="/checkout">Checkout</NavLink></li>
                        <li>
                            {this.props.isAuthenticated
                                ? <NavLink to="/orders">Orders</NavLink>
                                : null
                            }
                        </li>
                        <li>
                            {!this.props.isAuthenticated
                                ? <NavLink to="/authentication">Authenticate</NavLink>
                                : <NavLink to="/logout">Logout</NavLink>
                            }

                        </li>
                    </ul>
                </div>
                <div className="content">
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/orders" component={Orders}/>
                    <Route path="/authentication" component={Auth}/>
                    <Route path="/logout" comonent={Logout}/>
                    <Route path="/" exact component={OrderBuilder}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps,null)(App);
