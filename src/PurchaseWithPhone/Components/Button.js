import React from 'react';

export default function Button(props) {
    const {
        children,
        onClick,
        ...restProps,
    } = props;

    return (
        <button onClick={onClick} {...restProps}>{children}</button>
    );
}