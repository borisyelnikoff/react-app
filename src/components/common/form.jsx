import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
    state = {
        data: {},
        errors: {}
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        return (error) ? error.details.reduce((obj, item) => (obj[item.path[0]] = item.message, obj), {}) : null;
    };

    validateField = (propName, value) => {
        const data = { [propName]: value };
        const schema = { [propName]: this.schema[propName] };
        const { error } = Joi.validate(data, schema);
        return (error) ? error.details.reduce((obj, item) => (obj[item.path[0]] = item.message, obj), {}) : null;
    }

    handleSubmit = e => {
        e.preventDefault();
        
        const errors = this.validate();
        this.setState({ errors: errors || {}});

        if (errors) return;
        
        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        const errors = this.validateField(input.name, input.value);
        this.setState({ data, errors: errors || {} });
    };

    renderButton = label => (<button disabled={this.validate()} className="btn btn-primary" type="submit">{label}</button>);

    renderInput = (propName, label, type = "text") => {
        const { data, errors } = this.state;
        return (<Input 
            name={propName} 
            label={label} 
            error={errors[propName]} 
            value={data[propName]} 
            type={type} 
            onChange={this.handleChange} />
        );
    };

    renderSelect = (propName, label, options) => {
        const { data, errors } = this.state;
        return (
            <Select 
                name={propName} 
                label={label} 
                options={options} 
                error={errors[propName]} 
                value={data[propName]} 
                onChange={this.handleChange} />
        );
    };
}
 
export default Form;