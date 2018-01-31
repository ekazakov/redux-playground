import React from 'react';
import { newState } from '../../utils';

export const CHANGE_INPUT = '@@app/CHANGE_INPUT';

export function changeInput(value) {
    return {
        type: CHANGE_INPUT,
        payload: { value }
    };
}

export function reducer(state, { type, payload } = {}) {
    if (type === CHANGE_INPUT) {
        return parseInt(payload.value);
    }

    return state;
}

export const view = function Input(props) {
    const {
        dispatch,
        value,
        ...restProps
    } = props;

    const onChange =
        ({ target: { value }}) => dispatch(changeInput(value));

    return (
        <input
            value={value}
            onChange={onChange}
            {...restProps}
        />
    );
};