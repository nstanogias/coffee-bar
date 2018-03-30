import React, {Component} from 'react';
import OrderBuilder from './containers/OrderBuilder';
import {Route, NavLink, withRouter} from 'react-router-dom';
import Checkout from './containers/Checkout';
import Orders from './containers/Orders';
import Auth from './containers/Auth';
import {connect} from 'react-redux';
import Logout from "./containers/Logout";
import * as actions from './store/actions/actions';

import {Layout, Menu} from 'antd';

const {Header, Content, Footer} = Layout;

class App extends Component {


    componentDidMount() {
        console.log(this.props.isAuthenticated);
        this.props.onTryAutoSignUp();
    }

    render() {
        console.log("auth", this.props.isAuthenticated);
        return (
            <div>
                <Layout className="layout" style={{margin: '0 auto', width: '50%', textAlign: 'center'}}>
                    <Header>
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            style={{lineHeight: '64px'}}
                        >
                            <Menu.Item key="1"><NavLink exact to="/">Home</NavLink></Menu.Item>
                            <Menu.Item key="2"><NavLink to="/checkout">Checkout</NavLink></Menu.Item>
                            <Menu.Item key="3">{this.props.isAuthenticated
                                ? <NavLink to="/orders">Orders></NavLink>
                                : null}
                            </Menu.Item>
                            <Menu.Item key="4">{this.props.isAuthenticated
                                ? <NavLink to="/authentication">Authenticate</NavLink>
                                : <NavLink to="/logout">Logout</NavLink>}
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content>
                        <Route path="/" exact component={OrderBuilder}/>
                        <Route path="/checkout" component={Checkout}/>
                        <Route path="/orders" component={Orders}/>
                        <Route path="/authentication" component={Auth}/>
                        <Route path="/logout" component={Logout}/>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Created by Nikolaos Stanogias ©2018
                    </Footer>
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
