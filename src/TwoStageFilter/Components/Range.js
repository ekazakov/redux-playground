import React from 'react';
import * as Input from './Input';
import {
    actionFor,
    forwardTo,
    updateProperty
} from '../../Counters/counter-utils';

const inputStyle = {};
const groupStyle = {};

const FROM = '@app/FROM';
const TO = '@app/TO';

export function reducer(state = {}, action) {
    let nextState = updateProperty(
        state,
        'from',
        Input.reducer(state.from, actionFor(FROM, action))
    );
    nextState = updateProperty(
        nextState,
        'to',
        Input.reducer(state.to, actionFor(TO, action))
    );

    return nextState
}

export const view = function Range(props) {
    const { 
        label, 
        from, 
        to,
        dispatch,
    } = props;

    return (
        <div>
            <div>
                {label}  
            </div>
            <div>
                <div>
                    From: <Input.view
                    value={from} dispatch={forwardTo(FROM, dispatch)} />
                </div>
                <div>
                    To: <Input.view value={to} dispatch={forwardTo(TO, dispatch)} />
                </div>
            </div>
        </div>
    );
};
