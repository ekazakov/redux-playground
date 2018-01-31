import React from 'react';
import * as Table from '../Table/Table';
import * as Filter from '../Filter/Filter';
import records from '../../../Tables/data/dataA.json';
import {
    actionFor,
    forwardTo,
    localConnect,
    unwrap,
    updateProperty
} from '../../../Counters/counter-utils';
import {
    applyFilter,
    applyPagination
} from '../../../utils';
import * as Pagination from '../Pagination/Pagination';

const FILTER = '@app/FILTER';
const PAGINATION = '@app/PAGINATION';

export const initialState = {
    records,
    filter: Filter.initialsState,
    pagination: Pagination.initialState,
};

export function reducer(state = initialState, action) {
    let nextState = updateProperty(
        state,
        'filter',
        Filter.reducer(state.filter, actionFor(FILTER, action))
    );

    nextState = updateProperty(
        nextState,
        'pagination',
        Pagination.reducer(nextState.pagination, actionFor(PAGINATION, action))
    );

    if (actionFor(FILTER, action)) {
        nextState.pagination.page = 1;
    }

    return nextState;
}

const style = {
    display: 'flex',
};

const getFilterState = (state) => state.filter;
const getPaginationState = (state) => state.pagination;

function TableWithFilter(props) {
    const {
        dispatch,
        records,
        size,
        page,
    } = props;
    console.log(props);
    return (
        <div style={style}>
            <div>
                <Table.view records={records} />
                <Pagination.view
                    page={page}
                    size={size}
                    selector={getPaginationState}
                    dispatch={forwardTo(PAGINATION, dispatch)}
                />
            </div>
            <div>
                <Filter.view
                    selector={getFilterState}
                    dispatch={forwardTo(FILTER, dispatch)}
                />
            </div>
        </div>
    );
}

function controller(state) {
    const { records, filter, pagination } = state;
    const filteredRecords = applyFilter(records, filter.appliedState);

    return {
        records: applyPagination(
            filteredRecords,
            pagination,
        ),
        size: filteredRecords.length,
    }
}

export const view = localConnect(controller)(TableWithFilter);

