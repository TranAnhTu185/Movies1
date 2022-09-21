import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

Button.propTypes = {
    onClick: PropTypes.func
};
export const OutlineButton = props => {
    return (
        <button
            className={`btn-outline ${props.className}`}
            onClick={props.onClick ? () => props.onClick(): null}
        >
            {props.children}
        </button>
    );
}

function Button(props) {
    return (
        <button
            className={`btn ${props.className}`}
            onClick={props.onClick ? () => props.onClick(): null}
        >
            {props.children}
        </button>
    );
}

export default Button;