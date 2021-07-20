import React from 'react';

const Select = ({ name, label, options, error, ...rest }) => {
    const renderOptions = option => {
        if (typeof option === "string") return <option key={option} value={option}>{option}</option>
        if (option._id && option.name) return <option key={option._id} value={option._id}>{option.name}</option>
        return null
    };

    return (
        <div className="form-group">
            <label htmlFor={name} className="form-label">{label}</label>
            <select {...rest} name={name} id={name} className="form-control">
                <option key="" value="">--Pleas choose an option--</option>
                {options.map(renderOptions)}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
 
export default Select;