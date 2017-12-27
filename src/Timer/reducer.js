import { loop, Cmd } from 'redux-loop';
import { newState } from '../utils';
import { tick } from './actions';
const initialState = {
    isRunning: false,
    value: 0
};

const onTick = (state) => {
    const nextState = newState(state, () => {
        const value = state.value + 1;

        if (!state.isRunning) {
            return state;
        }

        return {
            value,
            isRunning: value < 10,
        };
    });

    const sideEffect = () => {
        if (nextState.value < 10) {
            return delay(1000);
        }

        return Promise.reject();
    };

    return loop(
        nextState,
        Cmd.run(sideEffect, {
            successActionCreator: tick
        })
    );
};

export default function timerReducer(state = initialState, { type, payload }) {
    switch (type) {
    case 'START':
        return loop(
            newState(state, {
                isRunning: true,
            }),
            (state.isRunning ? Cmd.none : Cmd.action(tick()))
        );
    case 'TICK':
        return onTick(state);
    default:
        return state;
    }
}

export function delay(delayTime) {
    return new Promise(resolve => {
        setTimeout(resolve, delayTime);
    });
}