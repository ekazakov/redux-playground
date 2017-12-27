import includes from 'lodash/includes';
import records from '../Tables/data/dataA.json';
import types from './actions';
import { newState } from '../utils';
import { combineReducers } from 'redux';

const paginationInitialState = {
    page: 1,
    pageSize: 20,
};

// function predicateReducer(reducer, predicate) {
//     return (state, action) => {
//         if (predicate(action.type)) {
//             return reducer(state, { type: types.RESET_PAGINATION });
//         }
//
//         return reducer(state, action);
//     }
// }
// const paginationWithResetReducer = predicateReducer(
//     paginationReducer,
//     (actionType) => includes(actionType, '/filter/')
// );

function paginationReducer(state = paginationInitialState, { type, payload }) {
    switch (type) {
    case types.GO_TO_PAGE:
        return newState(state, {
            page: payload.page,
        });
    // case types.RESET_PAGINATION:
    //     return newState(state, {
    //         page: 1,
    //     });
    default:
        return state;
    }
}

const filterInitialState = {
    amount: {
        from: 10, to: 1000,
    },
    age: {
        from: 0,
        to: 100,
    }
};

const filterReducer = (state = filterInitialState, action) => {
    switch(action.type) {
    case types.AGE_FROM_INPUT_CHANGED:
        return newState(state, {
            age: { from: action.payload.value }
        });
    case types.AGE_TO_INPUT_CHANGED:
        return newState(state, {
            age: { to: action.payload.value }
        });
    case types.AMOUNT_FROM_INPUT_CHANGED:
        return newState(state, {
            amount: { from: action.payload.value }
        });
    case types.AMOUNT_TO_INPUT_CHANGED:
        return newState(state, {
            amount: { to: action.payload.value }
        });
    default:
        return state;
    }
};

// не слишком элегантное решение
// (actionType) => includes(actionType, '/filter/')

const tableAReducer = combineReducers({
    records: () => records,
    pagination: paginationReducer,
    filter: filterReducer,
});

const rootReducer = combineReducers({
    tableA: tableAReducer
});

export default rootReducer;