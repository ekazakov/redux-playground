import React from 'react';
import { Cmd, loop, liftState } from 'redux-loop';
import * as Range from '../Range';
import {
    createReducer,
    FORWARD,
    forwardTo,
    getActionName,
    localConnect,
    newLiftedState,
    unwrapOnce,
} from '../../../utils2';
import { newState } from '../../../utils';
import { addToQuery } from '../../effects';

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

export const APPLY_FILTER = '@@app/APPLY_FILTER';
export const RESET_FILTER = '@@app/RESET_FILTER';

function applyFilter() {
    return { type: APPLY_FILTER };
}

function resetFilter() {
    return { type: RESET_FILTER };
}

const subReducer = createReducer({
    [AGE]: (state, action) => {
        return newLiftedState(
            state,
            'currentState.age',
            Range.reducer(state.currentState.age, unwrapOnce(action))
        );
    },
    [AMOUNT]: (state, action) => {
        return newLiftedState(
            state,
            'currentState.amount',
            Range.reducer(state.currentState.amount, unwrapOnce(action))
        );
    },
}, getActionName);

export const reducer = createReducer({
    [APPLY_FILTER]: (state) => {
        return newLiftedState(
            state,
            'appliedState',
            loop(
                state.currentState,
                Cmd.run(addToQuery, {
                    args: [{
                        ageFrom: state.currentState.age.from,
                        ageTo: state.currentState.age.to,
                        amountFrom: state.currentState.amount.from,
                        amountTo: state.currentState.amount.to,
                    }]
                })
            )
        )
    },
    [RESET_FILTER]: (state) => {
        return loop(
            newState(state, initialsState),
            Cmd.run(addToQuery, {
                args: [{
                    ageFrom: initialsState.currentState.age.from,
                    ageTo: initialsState.currentState.age.to,
                    amountFrom: initialsState.currentState.amount.from,
                    amountTo: initialsState.currentState.amount.to,
                }]
            })
        );
    },
    [FORWARD]: subReducer
});


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
            />
            <Range.view
                label="Amount"
                {...amount}
                dispatch={forwardTo(AMOUNT, dispatch)}
            />
            <div>
                <button onClick={() => dispatch(applyFilter())}>Apply</button>
                <button onClick={() => dispatch(resetFilter())}>Reset</button>
            </div>
        </div>
    );
}

export const view = localConnect()(Filter);
