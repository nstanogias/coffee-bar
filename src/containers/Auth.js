import React, {Component} from 'react';
import { Form, Icon, Input, Button, Layout } from 'antd';
import 'antd/dist/antd.css';

class Auth extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout.Content style={{margin:'0 auto', width:'50%', textAlign:'center'}}>
                <h1>Authentication Details</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <br></br>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </Layout.Content>
        );
    }
}

const AuthForm = Form.create()(Auth);

export default AuthForm;