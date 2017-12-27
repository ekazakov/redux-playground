import React from 'react';

export default function Input(props) {
    const {
        onChange,
        value,
        ...restProps
    } = props;

    const _onChange = ({ target: { value }}) => onChange(value);

    return (
        <input
            value={value}
            onChange={_onChange}
            {...restProps}
        />
    );
}