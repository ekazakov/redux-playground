import React from 'react';
import { newState } from '../../utils';
import { createReducer } from '../../utils2';

export const CHANGE_INPUT = '@@app/CHANGE_INPUT';

export function changeInput(value) {
    return {
        type: CHANGE_INPUT,
        payload: { value }
    };
}

export const reducer = createReducer({
    [CHANGE_INPUT]: (state, { payload } = {}) => {
        return parseInt(payload.value)
    },
});

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