import React, {Component} from 'react';
import 'antd/dist/antd.css';

import {connect} from 'react-redux';
import axios from '../axios-orders';
import * as actions from '../store/actions/actions';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import {Tabs, Table, Icon} from 'antd';

const TabPane = Tabs.TabPane;

class OrderBuilder extends Component {

    componentWillMount() {
        this.props.onInitBar();
    }

    callback(key) {
        // console.log(key);
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
                render: () => (
                    <a href="#" className="ant-dropdown-link"><Icon type="minus"/></a>
                ),
            },
            {
                title: 'Add',
                key: 'add',
                render: (text, record) => (
                    <a href="#" className="ant-dropdown-link"><Icon type="plus"/></a>
                ),
            }];

        let data = null;
        if (this.props.bvgs) {
            console.log(this.props.bvgs);
            console.log(this.props.price);
            data = Object.keys(this.props.bvgs).map(el => {
                return {
                    name: el,
                    price: this.props.bvgs[el]
                }
            });
            console.log(data);
        }

        return (
            <Tabs defaultActiveKey="1" onChange={this.callback()}>
                <TabPane tab="Tab 1" key="1"><Table columns={columns} dataSource={data}/></TabPane>
                <TabPane tab="Tab 2" key="2"><Table columns={columns} dataSource={data}/></TabPane>
            </Tabs>
        )
    }
}

const mapStateToProps = state => {
    return {
        bvgs: state.beverages,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitBar: () => dispatch(actions.initBar())
        //onBeverageAdded: (ingName) => dispatch({type: actionTypes.ADD_BEVERAGE, ingredientName: ingName}),
        //onBeverageRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_BEVERAGE, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OrderBuilder, axios));
