import React from 'react';
import PropTypes from 'prop-types';

export const CheckBox = (props) => {
    const { id , className , type, onChange, checked } = props;
    return (
        <input type = {type} id = {id} className = {className} onChange = {onChange} style={{opacity:15}} checked = {checked}/>
    )
}

CheckBox.propTypes = {
    id : PropTypes.string.isRequired,
    className : PropTypes.string.isRequired,
    onChange : PropTypes.func.isRequired,
    checked : PropTypes.bool.isRequired

}
 CheckBox.defaultProps = {
     type : 'checkbox'
 }


