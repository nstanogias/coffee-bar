import React, {Component} from 'react';
import {Form, Input, Button, Layout} from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';

class Checkout extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const orderData = {
                    orderItems: this.props.order,
                    price: this.props.price,
                    contactData: values,
                    userId: this.props.userId
                }

                this.props.onOrderDrinks(orderData, this.props.token);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Layout.Content style={{margin: '0 auto', width: '50%'}}>
                <h1 style={{textAlign: 'center'}}>Please fill in your contact details</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(<span>FirstName</span>)}
                    >
                        {getFieldDecorator('firstname', {
                            rules: [{required: true, message: 'Please input your firstname!', whitespace: true}],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(<span>LastName</span>)}
                    >
                        {getFieldDecorator('lastname', {
                            rules: [{required: true, message: 'Please input your lastname!', whitespace: true}],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(<span>Address</span>)}
                    >
                        {getFieldDecorator('address', {
                            rules: [{required: true, message: 'Please input your address!', whitespace: true}],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label={(<span>Zip Code</span>)}
                    >
                        {getFieldDecorator('zipcode', {
                            rules: [{required: true, message: 'Please input your zipcode!', whitespace: true}],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Button style={{float: 'center'}} type="primary" htmlType="submit">Order</Button>
                </Form>
            </Layout.Content>
        );
    }
}

const CheckoutForm = Form.create()(Checkout);

const mapStateToProps = state => {
    return {
        order: state.bar.order,
        price: state.bar.price,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderDrinks: (orderData, token) => dispatch(actions.purchaseOrder(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);