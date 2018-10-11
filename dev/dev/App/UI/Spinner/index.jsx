import PropTypes from 'prop-types';
import React from 'react';
import classSet from 'classnames';

// styles
import css from './Spinner.sss';

const Spinner = (props) => {
    const totalClasses = classSet(
        css.root,
        {
            [css.typeBlock]: props.isBlock,
            [css.positionFixed]: props.position === 'fixed',
            [css.positionStatic]: props.position === 'static',
            [css.bgLightGrey]: props.bg === 'light-grey',
            [css.bgTransparent]: props.bg === 'transparent',
            [css.bgWhite]: props.bg === 'white',
            [css.size16]: props.size === '16',
            [css.size20]: props.size === '20',
            [css.size30]: props.size === '30',
            [css.size40]: props.size === '40',
            [css.themeOrange]: props.theme === 'orange',
        },
    );

    return (
        <span className={totalClasses}>
            <span className={props.fixedCircle ? css.fixedCircle : css.circle}>
                <span className={css.innerCircle} />
            </span>
        </span>
    );
};

Spinner.propTypes = {
    isBlock: PropTypes.bool,
    position: PropTypes.string,
    bg: PropTypes.string,
    size: PropTypes.string,
    theme: PropTypes.string,
    fixedCircle: PropTypes.bool,
};

export default Spinner;
