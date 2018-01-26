import React from 'react';

export default function Input(props) {
    const {
        value,
        onChange,
        ...restParams,
    } = props;

    return (
        <input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            {...restParams}
        />
    );
}