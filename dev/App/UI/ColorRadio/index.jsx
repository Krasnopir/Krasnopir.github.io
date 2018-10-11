import PropTypes from 'prop-types';
import React from 'react';

// styles
import css from './ColorRadio.sss';


const ColorRadio = (props) => {
    const handleChange = (e) => {
        if (!props.disabled) props.onChange(e);
    };

    const previewStyles = {
        borderLeftColor: props.color,
        borderTopColor: props.color,
        borderRightColor: props.color2 ? props.color2 : props.color,
        borderBottomColor: props.color2 ? props.color2 : props.color,
    };

    return (
        <label className={css.root}>
            <input
                name={props.name}
                className={css.input}
                type='radio'
                value={props.value}
                onChange={handleChange}
                checked={props.checked}
            />
            <span className={css.preview}>
                <span className={css.previewInner} style={previewStyles} />
            </span>
        </label>
    );
};

ColorRadio.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    color2: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool,
};

ColorRadio.defaultProps = {
    checked: false,
};

export default ColorRadio;
