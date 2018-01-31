import React from 'react';
import * as Range from '../Range';
import {
    actionFor,
    forwardTo,
    isForwarded,
    localConnect,
    unwrap,
    updateProperty
} from '../../../Counters/counter-utils';
import { newState } from '../../../utils';

const foo = {
    amount: {
        from: 10,
        to: 1000,
    },
    age: {
        from: 0,
        to: 100,
    }
};

export const initialsState = {
    currentState: foo,
    appliedState: foo,
};

const AGE = '@app/AGE';
const AMOUNT = '@app/AMOUNT';

const APPLY_FILTER = '@@app/APPLY_FILTER';
const RESET_FILTER = '@@app/RESET_FILTER';

function applyFilter() {
    return { type: APPLY_FILTER };
}

function resetFilter() {
    return { type: RESET_FILTER };
}


export function reducer(state = initialsState, action = {}) {
    if (isForwarded(action)) {
        if (actionFor(AGE, action)) {
            return newState(state, {
                currentState: {
                    age: Range.reducer(state.currentState.age, actionFor(AGE, action))
                }
            });
        }

        if (actionFor(AMOUNT, action)) {
            return newState(state, {
                currentState: {
                    amount: Range.reducer(state.currentState.amount, actionFor(AMOUNT, action))
                }
            });
        }
    }

    switch (action.type) {
    case APPLY_FILTER:
        return newState(state, {
            appliedState: state.currentState,
        });

    case RESET_FILTER:
        return newState(state, initialsState);
    }

    return state;
}

function Filter(props) {
    const {
        dispatch,
        currentState: { age, amount },
    } = props;

    return (
        <div>
            <div>
                <h4>Filter</h4>
            </div>
            <Range.view
                label="Age"
                {...age}
                dispatch={forwardTo(AGE, dispatch)}
                // onFromChange={ageFromInputChanged}
                // onToChange={ageToInputChanged}
            />
            <Range.view
                label="Amount"
                {...amount}
                dispatch={forwardTo(AMOUNT, dispatch)}
                // onFromChange={amountFromInputChanged}
                // onToChange={amountToInputChanged}
            />
            <div>
                <button onClick={() => dispatch(applyFilter())}>Apply</button>
                <button onClick={() => dispatch(resetFilter())}>Reset</button>
            </div>
        </div>
    );
}

export const view = localConnect()(Filter);
