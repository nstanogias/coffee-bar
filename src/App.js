import React, { Component } from 'react';
import OrderBuilder from './containers/OrderBuilder';
import { Route, Switch } from 'react-router-dom';
import Checkout from './containers/Checkout';

class App extends Component {
    render () {
        return (
            <div>
                <Switch>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/" exact component={OrderBuilder}/>
                </Switch>
            </div>
        );
    }
}

export default App;
