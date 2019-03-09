import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Button = (props, context) => (
    <button
        type='button'
        className="custom-btn"
        onClick={() => {
            props.history.push(props.link)
        }}
    >
        {props.text}
    </button>
)


Button.propTypes = {
    link: PropTypes.string,
    text: PropTypes.string,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default Button;
