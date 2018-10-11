import PropTypes from 'prop-types';
import React from 'react';

// styles
import css from './Checkbox.sss';


const Checkbox = (props) => {
    const handleChange = (e) => {
        if (!props.disabled) props.onChange(e);
    };

    return (
        <label className={css.root}>
            <input
                disabled={props.disabled}
                name={props.name}
                className={css.input}
                type='checkbox'
                value={props.value}
                onChange={handleChange}
                checked={props.checked}
            />
            <span className={css.fakeInput} />
            {props.text &&
                <span className={props.disabled ? css.textDisabled : css.text}>{props.text}</span>
            }
        </label>
    );
};

Checkbox.propTypes = {
    disabled: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.string,
    text: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
};

Checkbox.defaultProps = {
    checked: false,
};

export default Checkbox;
