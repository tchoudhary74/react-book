import React from 'react';
import PropTypes from 'prop-types';


export const InputTextBox = (props) => {
    const { type, id, className = 'input', value, onChange, disabled = false, placeholder, name } = props;

    return (
        <input type={type} id={id} className={className} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder} name ={name} />
    )

}
InputTextBox.propTypes= {
    id: PropTypes.string.isRequired,
    className :PropTypes.string,
    type:PropTypes.oneOf(['text', 'email', 'password', 'number']),
    onChange:PropTypes.func.isRequired,
}

