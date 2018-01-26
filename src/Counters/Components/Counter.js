import React from 'react';
import { localConnect } from '../counter-utils';
import * as actions from '../actions';

export const Counter = localConnect(
    state => ({ count: state })
)(
    ({name, count, dispatch }) => <div>
        <p>{name}:
            {count}
            <button onClick={() => dispatch(actions.dec())}>-</button>
            <button onClick={() => dispatch(actions.inc())}>+</button> </p>
    </div>
);