import React from 'react';

export const Button = (props) => {
    const { id, className, type, value, onClick } = props
    return (
        <button type={type} id={id} className={className} onClick={onClick}>{value}</button>
    )
}

