import React from 'react';

export default function Input(props) {
    const {
        onChange,
        ...restProps
    } = props;
    return (
        <input
            {...restProps}
            onChange={({ target: { value } }) => onChange(value)}
        />
    )
}