import PropTypes from 'prop-types';
import React from 'react';
import classSet from 'classnames';

// styles
import css from './Button.sss';


const Button = (props) => {
    const totalClasses = classSet(
        css.root,
        {
            [css.themeRed]: props.theme === 'red',
            [css.typeContour]: props.typeContour,
            [css.fullWidth]: props.fullWidth,
            [css.sizeXS]: props.size === 'xs',
            [css.sizeS]: props.size === 's',
            [css.sizeL]: props.size === 'l',
            [css.sizeXL]: props.size === 'xl',
            [css.stateDisabled]: props.disabled,
            [css.stateLoading]: props.isLoading,
        },
    );

    return (
        <button
            name={props.name}
            className={totalClasses}
            type={props.type}
            disabled={props.disabled}
            data-qa={props.dataQa}
            onClick={(props.disabled || props.isLoading) ? null : props.onClick}
        >
            <span className={css.text}>{props.children}</span>
        </button>
    );
};

Button.propTypes = {
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    typeContour: PropTypes.bool,
    name: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    theme: PropTypes.string,
    width: PropTypes.oneOf(['full', 'wide']),
    onClick: PropTypes.func,
    dataQa: PropTypes.string,
};

Button.defaultProps = {
    type: 'button',
};

export default Button;
