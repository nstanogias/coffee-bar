import React, {Component} from 'react';
import {Form, Icon, Input, Button, Layout} from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';

class Auth extends Component {

    state = {
        isSigneUp: true
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleSwitchAuthMode = () => {
        this.setState(prevState => {
            return {isSigneUp: !prevState.isSigneUp};
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout.Content style={{margin: '0 auto', width: '50%', textAlign: 'center'}}>
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
                        <Button htmlType="submit" type="primary"> Submit </Button>
                    </Form.Item>
                </Form>
                <Button onClick={this.handleSwitchAuthMode} type="primary" className="login-form-button">
                    Switch to {this.state.isSigneUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </Layout.Content>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

const AuthForm = Form.create()(Auth);

export default connect(null, mapDispatchToProps)(AuthForm);