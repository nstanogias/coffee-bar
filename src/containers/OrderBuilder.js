import React, {Component} from 'react';
import 'antd/dist/antd.css';

import {connect} from 'react-redux';
import axios from '../axios-orders';
import * as actions from '../store/actions/actions';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import {Tabs, Table, Button, Modal} from 'antd';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import {Redirect} from 'react-router-dom';
import Aux from '../hoc/Aux';

const TabPane = Tabs.TabPane;

class OrderBuilder extends Component {

    state = {
        purchasing: false
    }

    componentWillMount() {
        this.props.onInitBar();
    }


    handleOk = () => {
        this.props.history.push('/checkout');
    }

    showModal = () => {
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/authentication');
        }

    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    render() {

        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: 'Remove',
                key: 'remove',
                render: (record) => (
                    <Button
                        disabled={this.props.order === null || (Object.keys(this.props.order).indexOf(record.name) === -1)}
                        onClick={() => this.props.onDrinkRemoved(record)} type="primary"
                        icon="minus"> </Button>
                ),
            },
            {
                title: 'Add',
                key: 'add',
                render: (record) => (
                    <Button onClick={() => this.props.onDrinkAdded(record)} type="primary" icon="plus"> </Button>
                ),
            }];

        let tabPanes = null;
        let tabs = null;
        if (this.props.menu) {
            tabPanes = Object.entries(this.props.menu).map((value, key) => (
                <TabPane tab={value[0].toUpperCase()} key={key}><Table key={key} columns={columns}
                                                                       dataSource={Object.entries(value[1]).map((value, key) => {
                                                                           return {
                                                                               name: value[0],
                                                                               price: value[1]
                                                                           }
                                                                       })}/></TabPane>
            ))
            tabs = (<Tabs>{tabPanes}</Tabs>);
        }

        let orderSummary = null;
        if (this.props.order) {
            orderSummary = <OrderSummary
                items={this.props.order}
                price={this.props.price}/>;
        }

        return (
            <Aux>
                {tabs}
                <p>Current Price: <strong>{this.props.price.toFixed(2)}</strong></p>'

                <Modal title="Order Summary" visible={this.state.purchasing} onOk={this.handleOk}
                       onCancel={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Button type={'primary'} disabled={this.props.price === 0} onClick={this.showModal}>{this.props.isAuthenticated?'ORDER NOW':'SIGN UP TO ORDER'}</Button>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        menu: state.bar.menu,
        price: state.bar.totalPrice,
        order: state.bar.order,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitBar: () => dispatch(actions.initBar()),
        onDrinkAdded: (data) => dispatch(actions.addDrink(data)),
        onDrinkRemoved: (data) => dispatch(actions.removeDrink(data)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OrderBuilder, axios));
