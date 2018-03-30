import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';
import 'antd/dist/antd.css';

class Register extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <h1>Log in Details</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                   placeholder="Username"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                   placeholder="Password"/>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Register
                        </Button>
                        <br></br>
                        Have an account? <a href="">Log in!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const RegisterForm = Form.create()(Register);

export default RegisterForm;