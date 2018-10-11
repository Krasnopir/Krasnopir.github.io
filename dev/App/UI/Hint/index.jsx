import React from 'react';

// styles
import css from './Hint.sss';


const Hint = (props) => (
    <span className={css.root}>
        <span className={css.icon} />
        <span className={css.body}>
            <span className={css.text}>
                {props.children}
            </span>
        </span>
    </span>
)

export default Hint;