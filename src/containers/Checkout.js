import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';

class Checkout extends Component {


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    {...formItemLayout}
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
                    {...formItemLayout}
                    label={(<span>FirstName</span>)}
                >
                    {getFieldDecorator('firstname', {
                        rules: [{required: true, message: 'Please input your firstname!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label={(<span>LastName</span>)}
                >
                    {getFieldDecorator('lastname', {
                        rules: [{required: true, message: 'Please input your lastname!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label={(<span>Address</span>)}
                >
                    {getFieldDecorator('address', {
                        rules: [{required: true, message: 'Please input your address!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label={(<span>Zip Code</span>)}
                >
                    {getFieldDecorator('zipcode', {
                        rules: [{required: true, message: 'Please input your zipcode!', whitespace: true}],
                    })(
                        <Input/>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Order</Button>
                </Form.Item>
            </Form>
        );
    }
}

const CheckoutForm = Form.create()(Checkout);

export default CheckoutForm;