import includes from 'lodash/includes';
import recordsA from '../Tables/data/dataA.json';
import recordsB from '../Tables/data/dataB.json';
import types from './actions';
import { newState } from '../utils';
import { combineReducers } from 'redux';

function paginationReducer(initialState, predicate) {
    const reducer = (state = initialState, { type, payload}) => {
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

    return (state, action) => {
        if (predicate(action.type)) {
            return reducer(state, { type: types.RESET_PAGINATION });
        }

        return reducer(state, action);
    }
}

const inputReducer = (initialState, [INPUT_CHANGED]) =>
    (state = initialState, { type, payload }) => {
        switch (type) {
        case INPUT_CHANGED:
            return payload.value; // хорошо, что в payload у нас всегда value
        default:
            return state;
        }
    };

const rangeReducer = (initialState, [FROM_INPUT_CHANGED, TO_INPUT_CHANGED]) => {
    return combineReducers({
        from: inputReducer(initialState.from, [FROM_INPUT_CHANGED]),
        to: inputReducer(initialState.to, [TO_INPUT_CHANGED]),
    })
};

const filterReducer = (initialState) =>
    combineReducers({
        amount: rangeReducer(
            initialState.amount,
            [ types.AMOUNT_FROM_INPUT_CHANGED, types.AMOUNT_TO_INPUT_CHANGED ]
        ),
        age: rangeReducer(
            initialState.age,
            [ types.AGE_FROM_INPUT_CHANGED, types.AGE_TO_INPUT_CHANGED ]
        ),
    });


const tableAReducer = combineReducers({
    records: () => recordsA,
    pagination: paginationReducer(
        { page: 1, pageSize: 20, },
        (actionType) => includes(actionType, '/filter/')
    ),
    filter: filterReducer({
        amount: { from: 10, to: 1000, },
        age: { from: 0, to: 100 },
    }),
});

const rootReducer = combineReducers({
    tableA: tableAReducer,
});

export default rootReducer;