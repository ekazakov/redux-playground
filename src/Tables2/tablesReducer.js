import {
    includes,
} from 'lodash';
import { newState } from '../utils';
import types from './actions';
import recordsA from '../Tables/data/dataA.json';
import recordsB from '../Tables/data/dataB.json';
import {
    combine,
    combineChildren
} from '../reducer-utils/reducer-utils';

const filterInitialState = {
    amount: { from: 10, to: 1000, },
    age: { from: 0, to: 100 },
};

const initialState = {
    tableA: {
        records: recordsA,
        pagination: { page: 1, pageSize: 20, },
        filter: filterInitialState
    },
    tableB: {
        records: recordsB,
        pagination: { page: 1, pageSize: 20, },
        filter: filterInitialState
    }
};

const paginationReducer = (state, { type, payload }) => {
    switch (type) {
    case types.GO_TO_PAGE:
        return newState(state, {
            page: payload.page,
        });
    case types.RESET_PAGINATION:
        return newState(state, {
            page: 1,
        });
    default:
        return state;
    }
};

const inputReducer = (state, { type, payload }) => {
    switch (type) {
    case types.INPUT_CHANGED:
        return payload.value;
    default:
        return state;
    }
};

const filterResetReducer = (state, action) => {
    switch (action.type) {
    case types.RESET_FILTER:
        return filterInitialState;
    default:
        return state;
    }
};

const resetPaginationReducer = (state, { namespace }) => {
    if (includes(namespace, ':filter')) {
        return newState(state, {
            pagination: {
                page: 1
            }
        });
    }
    return state;
};

const rangeReducer = {
    from: inputReducer,
    to: inputReducer,
};

const filterReducer = combineChildren(
    filterResetReducer,
    {
        amount: rangeReducer,
        age: rangeReducer,
    }
);

const tableReducer = combineChildren(
    resetPaginationReducer,
    {
        records: (state) => state,
        pagination: paginationReducer,
        filter: filterReducer,
    }
);

const tablesReducer = combine({
    tableA: tableReducer,
    tableB: tableReducer,
});
const rootReducer = (state = initialState, action) =>
    tablesReducer(state, action);

export default rootReducer;