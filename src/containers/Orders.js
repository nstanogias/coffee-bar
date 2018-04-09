import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';
import {Row, Col, Card, Icon, Spin} from 'antd';
import withErrorHandler from "../hoc/withErrorHandler/withErrorHandler";
import axios from '../axios-orders';

class Orders extends Component {


    componentWillMount() {
        this.props.onOrdersFetch(this.props.token, this.props.userId);
    }

    render() {
        const antIcon = <Icon type="loading" style={{fontSize: 62}} spin/>;
        let orders = <Spin indicator={antIcon} size="large"/>;

        if(!this.props.loading) {
            orders = <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    {this.props.orders.map(order => {
                        return (
                            <Col span={8}>
                                <Card title={order.contactData.email} bordered={false}>{Object.entries(order.orderItems).map((value, key) => {
                                    return (
                                        <div>
                                            <p>{value[0]}: {value[1]}</p>
                                            <hr></hr>
                                        </div>
                                    )
                                })}
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        }
        return (
            <div>
            {orders}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrdersFetch: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));