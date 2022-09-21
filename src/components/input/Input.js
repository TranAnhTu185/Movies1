import React from 'react';
import "./Input.scss";

function Input(props) {
    return (
        <input
            type={props.type}
            placeholder={props.placeholder}
            value={props.title}
            onChange={props.onChange ? (e) => props.onChange(e): null}
        />
    );
}

export default Input;