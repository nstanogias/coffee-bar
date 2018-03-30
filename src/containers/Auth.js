import React, {Component} from 'react';
import {Form, Icon, Input, Button, Spin} from 'antd';
import 'antd/dist/antd.css';
import {connect} from 'react-redux';
import * as actions from '../store/actions/actions';
import Aux from '../hoc/Aux';
import {Redirect} from 'react-router-dom';

class Auth extends Component {

    state = {
        isSignedUp: true
    };

    componentDidMount() {
        if(!this.props.buildingOrder && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.onAuth(values.userName, values.password, this.state.isSignedUp);
            }
        });
    };

    handleSwitchAuthMode = () => {
        this.setState(prevState => {
            return {isSignedUp: !prevState.isSignedUp};
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        let message = <h1>Log in Details</h1>;

        if (this.props.error) {
            message = <h1>{this.props.error}</h1>;
        }

        const antIcon = <Icon type="loading" style={{fontSize: 62}} spin/>;
        let spinner = null;

        if (this.props.loading) {
            spinner = <Spin indicator={antIcon} size="large"/>;
        }

        let authRedirect = null;
        if(this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>;
        }

        return (
            <div>
                {authRedirect}
                {this.props.loading && spinner}
                {!this.props.loading &&
                <Aux>
                    {message}
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
                        Switch to {this.state.isSignedUp ? 'SIGN IN' : 'SIGN UP'}
                    </Button>
                </Aux>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingOrder: state.bar.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

const AuthForm = Form.create()(Auth);

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);