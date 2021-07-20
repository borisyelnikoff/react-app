import React from 'react';
import Joi from 'joi-browser';
import { register } from '../services/userService';
import Form from './common/form';
import auth from '../services/authService';

class RegisterForm extends Form {
    state = {
        data: { username: "", password: "", fullName: ""},
        errors: {}
    };

    schema = {
        username: Joi.string().required().email().label("Username"),
        password: Joi.string().required().min(5).label("Password"),
        fullName: Joi.string().required().label("Name")
    };

    doSubmit = async () => {
        try {
            const response = await register(this.state.data);
            auth.loginWithJwt(response.headers["x-auth-token"]);
            window.location = '/';
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    };

    render() { 
        return (
            <div className="login-form">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderInput("fullName", "Name")}
                    {this.renderButton("Register")}
                </form>
            </div>
          );
    }
}
 
export default RegisterForm;