import React from 'react';
import { start } from './actions';

export default function Timer(props) {
    const {
        value,
        isRunning,
        dispatch,
    } = props;
    return (
        <div>
            <div>isRunning: {isRunning ? 'yes' : 'no'}</div>
            <div>
                {value}
            </div>
            <div>
                <button onClick={() => dispatch(start())}>start</button>
            </div>
        </div>
    );
}