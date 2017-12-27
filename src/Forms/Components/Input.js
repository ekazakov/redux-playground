import React from 'react';

export default function Input(props) {
    const {
        onChange,
        ...restProps
    } = props;
    return (
        <input
            {...restProps}
            onChange={({ event: { target: { value }}}) => onChange(value)}
        />
    )
}