import React from 'react';

// styles
import css from './SelectPosition.sss';


const POSITIONS = [
    ['top-left', 'top-pre-left', 'top-center', 'top-pre-right', 'top-right'],
    ['pre-top-left', 'pre-top-pre-left', 'spacer', 'pre-top-pre-right', 'pre-top-right'],
    ['center-left', 'center-pre-left', 'spacer', 'center-pre-right', 'center-right'],
    ['pre-bottom-left', 'pre-bottom-pre-left', 'spacer', 'pre-bottom-pre-right', 'pre-bottom-right'],
    ['bottom-left', 'bottom-pre-left', 'bottom-center', 'bottom-pre-right', 'bottom-right'],
];

const SelectPosition = (props) => (
    <div className={css.root}>
        {POSITIONS.map((row, key) => (
            <ul className={css.row}>
                {row.map((position, index) => (
                    <li className={css.item} key={index}>
                        {position !== 'spacer' ? (
                            <label
                                className={css.label}
                                data-position={position}
                            >
                                <input
                                    name={props.name}
                                    className={css.input}
                                    type='radio'
                                    value={position}
                                    onChange={props.onChange}
                                    checked={props.current === position}
                                />
                                <span className={css.fakeInput} />
                            </label>
                        ) : (
                            <span className={css.spacer} />
                        )}
                    </li>
                ))}
            </ul>
        ))}
    </div>
)

export default SelectPosition;