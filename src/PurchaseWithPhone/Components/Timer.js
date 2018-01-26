import React from 'react';
import { formatTimer } from '../../utils';

export default function Timer(props) {
    const { time } = props;
    return (
        <span>
            {formatTimer(time)}
        </span>
    );
}