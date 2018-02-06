import React from 'react';
import {
    forwardTo,
    localConnect
} from '../../utils2';
import { Counter } from './Counter';

const getTopState = state => state.top;
const getBottomState = state => state.bottom;

function Pair ({ dispatch }) {
    return (<div>
        <Counter
            name="top"
            selector={getTopState}
            dispatch={forwardTo('TOP', dispatch)}
        />
        <Counter
            name="bottom"
            selector={getBottomState}
            dispatch={forwardTo('BOTTOM', dispatch)}
        />
    </div>);
}

export const CountersPair = localConnect()(Pair);