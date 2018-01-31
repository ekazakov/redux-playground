import React from 'react';
import times from 'lodash/times';
import { newState } from '../../../utils';
import { localConnect } from '../../../Counters/counter-utils';

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
const style = {
    display: 'flex',
};

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

export const CHANGE_PAGE = '@@app/CHANGE_PAGE';
export function changePage(page) {
    return {
        type: CHANGE_PAGE,
        payload: {
            page,
        },
    };
}

export const initialState = {
    page: 1,
    pageSize: 20,
};

export function reducer(state = initialState, { type, payload } = {}) {
    if (type === CHANGE_PAGE) {
        return newState(state, {
            page: payload.page,
        });
    }

    return state;
}

function Pagination (props) {
    const {
        page,
        pageSize,
        size,
        dispatch,
    } = props;

    const totalPages = Math.ceil(size / pageSize);

    return (
        <div style={style}>
            {times(totalPages, (index) => (
                <PaginationButton
                    key={index}
                    page={index + 1}
                    isSelected={page === (index + 1)}
                    onClick={() => dispatch(changePage(index + 1))}
                />
            ))}
        </div>
    );
}

export const view = localConnect()(Pagination);