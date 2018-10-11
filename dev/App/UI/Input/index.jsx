import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

// styles
import css from './Input.sss';


const Input = (props) => {

    const totalClasses = classNames(
        css.input,
        {
            [css.inputError]: props.error,
        },
    );

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            document.getElementById(e.target.id).blur();
        }
    };

    return (
        <div>
            <div className={css.root}>
                <input
                    autoComplete={props.autoComplete}
                    name={props.name}
                    className={css.input}
                    type={props.type}
                    id={props.id}
                    value={props.value}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    onChange={props.onChange}
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </div>
    );
}


Input.propTypes = {
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    autoComplete: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
}

Input.defaultProps = {
    disabled: false,
    error: false,
    autoComplete: 'autocomplete',
    name: '',
    type: 'text',
    id: '',
    value: '',
    placeholder: '',
};

export default Input;
