import React from 'react';
import * as Input from './Input';
import {
    actionFor,
    createReducer,
    FORWARD,
    forwardTo,
    getActionName,
    newLiftedState,
    unwrapOnce,
    updateProperty
} from '../../utils2';

const inputStyle = {};
const groupStyle = {};

const FROM = '@app/FROM';
const TO = '@app/TO';

// export function reducer(state = {}, action) {
//     let nextState = updateProperty(
//         state,
//         'from',
//         Input.reducer(state.from, actionFor(FROM, action))
//     );
//     nextState = updateProperty(
//         nextState,
//         'to',
//         Input.reducer(state.to, actionFor(TO, action))
//     );
//
//     return nextState
// }

const subReducer = createReducer({
    [FROM]: (state, action) => {
        return newLiftedState(
            state,
            'from',
            Input.reducer(state.from, unwrapOnce(action))
        )
    },
    [TO]: (state, action) => {
        return newLiftedState(
            state,
            'to',
            Input.reducer(state.to, unwrapOnce(action))
        )
    }
}, getActionName);

export const reducer = createReducer({
    [FORWARD]: subReducer
});

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
