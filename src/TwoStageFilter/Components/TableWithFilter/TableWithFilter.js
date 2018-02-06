import React from 'react';
import {
    getModel,
    getCmd,
    loop,
    liftState,
    Cmd,
} from 'redux-loop'
import * as Table from '../Table/Table';
import * as Filter from '../Filter/Filter';
import records from '../../../Tables/data/dataA.json';
import {
    FORWARD,
    actionFor,
    forwardTo,
    getActionName,
    isActionFor,
    localConnect,
    unwrap,
    unwrapOnce,
    updateProperty,
    wrapTo,
    createReducer,
    newLiftedState
} from '../../../utils2';
import {
    applyFilter,
    applyPagination,
    newState
} from '../../../utils';
import * as Pagination from '../Pagination/Pagination';

export const FILTER = '@app/FILTER';
export const PAGINATION = '@app/PAGINATION';

export const initialState = {
    records,
    filter: Filter.initialsState,
    pagination: Pagination.initialState,
};

const subReducer2 = createReducer({
    [FILTER]: (state, action) => {
        let nextState = newLiftedState(
            state,
            'filter',
            Filter.reducer(state.filter, unwrapOnce(action))
        );

        const { type } = unwrap(action);
        if (type === Filter.APPLY_FILTER || type === Filter.RESET_FILTER) {
            nextState = newLiftedState(
                nextState,
                'pagination',
                Pagination.reducer(getModel(nextState).pagination, Pagination.changePage(1))
            );
        }

        return nextState;
    },
    [PAGINATION]: (state, action) => {
        return newLiftedState(
            state,
            'pagination',
            Pagination.reducer(state.pagination, unwrapOnce(action))
        );
    },
}, getActionName);

const subReducer = createReducer({
    [FILTER]: (state, action) => {
        const filter = liftState(
            Filter.reducer(state.filter, unwrapOnce(action))
        );
        let nextState = updateProperty(state, 'filter', getModel(filter));

        const { type } = unwrap(action);
        if (type === Filter.APPLY_FILTER || type === Filter.RESET_FILTER) {
            const pagination = Pagination.reducer(
                nextState.pagination, Pagination.changePage(1)
            );
            nextState = newState(nextState, {
                pagination: getModel(pagination)
            });

            return loop(nextState, Cmd.list([
                getCmd(pagination),
                getCmd(filter)
            ]));
        }

        return loop(nextState, Cmd.list([
            getCmd(filter)
        ]));
    },

    [PAGINATION]: (state, action) => {
        const pagination = Pagination.reducer(
            state.pagination, unwrapOnce(action)
        );
        const nextState = newState(state, {
            pagination: getModel(pagination)
        });

        return loop(nextState, Cmd.list([
            getCmd(pagination)
        ]));
    },
}, getActionName);

export const reducer = createReducer({
    [FORWARD]: (state = initialState, action) => {
        return liftState(
            subReducer2(state, action)
        );
    }
});

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
    } = props;

    return (
        <div style={style}>
            <div>
                <Table.view records={records} />
                <Pagination.view
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

