import React from 'react';
import times from 'lodash/times';

const buttonStyle = (isSelected) => ({
    border:  isSelected ? '1px solid #333' : 'none',
    background: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    fontWeight: 'bold',
    textDecoration: isSelected ? 'none' : 'underline',
    fontSize: 14,
    cursor: isSelected ? 'default' : 'pointer' ,
});

function PaginationButton(props) {
    const {
        page,
        isSelected,
        onClick,
    } = props;

    return (
        <button
            style={buttonStyle(isSelected)}
            onClick={() => onClick(page)}
            disabled={isSelected}
        >
            {page}
        </button>
    );
}

const style = {
    display: 'flex',
};

export default function Pagination (props) {
    const {
        page,
        pageSize,
        size,
        onPageClick,
    } = props;

    const totalPages = Math.ceil(size / pageSize);

    return (
        <div style={style}>
            {times(totalPages, (index) => (
                <PaginationButton
                    key={index}
                    page={index + 1}
                    isSelected={page === (index + 1)}
                    onClick={onPageClick}
                />
            ))}
        </div>
    );
}


