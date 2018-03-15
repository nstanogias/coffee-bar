import React, {Component} from 'react';
import 'antd/dist/antd.css';

import {connect} from 'react-redux';
import axios from '../axios-orders';
import * as actions from '../store/actions/actions';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import {Tabs, Table, Button, Modal} from 'antd';
import OrderSummary from '../components/OrderSummary/OrderSummary';

const TabPane = Tabs.TabPane;

class OrderBuilder extends Component {

    state = {
        purchasing: false
    }

    componentWillMount() {
        this.props.onInitBar();
    }

    callback(key) {
        // console.log(key);
    }

    handleCancel = () => {
        this.setState( { purchasing: false } );
    }

    handleOk = () => {
        this.props.history.push('/checkout');
    }

    showModal = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        // this.props.onInitPurchase();
        // this.props.history.push('/checkout');
    }
    render() {

        const data = [{
            name: 'cola',
            price: 3,
            key: "1"
        },
            {
                name: 'fanta',
                price: 3,
                key: "2"
            }];

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
                    <Button onClick={() => this.props.onDrinkRemoved(record.price)} type="primary" icon="minus"> </Button>
                ),
            },
            {
                title: 'Add',
                key: 'add',
                render: (record) => (
                    <Button onClick={() => this.props.onDrinkAdded(record.price)} type="primary" icon="plus"> </Button>
                ),
            }];

        let menu = null;
        if (this.props.menu) {
            console.log(this.props.menu);
            console.log(this.props.price);
            menu = Object.keys(this.props.menu).map(el =>
                Object.keys(el).map( el2 => {
                        return {
                            name: el2,
                            price: this.props.menu[el2]
                        }
                    })
            );
            console.log(menu);
        }

        let orderSummary = null;
        orderSummary = <OrderSummary
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />;

        return (
            <div>
                <Tabs defaultActiveKey="1" onChange={this.callback()}>
                    <TabPane tab="Tab 1" key="1"><Table key="1" columns={columns} dataSource={data}/></TabPane>
                    <TabPane tab="Tab 2" key="2"><Table key="2" columns={columns} dataSource={data}/></TabPane>
                </Tabs>
                <p>Current Price: <strong>{this.props.price.toFixed(2)}</strong></p>'

                <Modal title="Order Summary" visible={this.state.purchasing} onOk={this.handleOk} onCancel={this.handleCancel}>
                    {orderSummary}
                </Modal>
                <Button type={'primary'} onClick={this.showModal}>Order</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        menu: state.menu,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitBar: () => dispatch(actions.initBar()),
        onDrinkAdded: (price) => dispatch(actions.addBeverage(price)),
        onDrinkRemoved: (price) => dispatch(actions.removeBeverage(price))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OrderBuilder, axios));
