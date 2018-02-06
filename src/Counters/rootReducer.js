import types from './actions';
import {
    actionFor,
    updateProperty
} from '../utils2';
const initialState = 0;

const counterReducer = (state = initialState, action) => {
    if(!action) return state;

    switch(action.type){
    case types.INC:
        return state + 1;
    case types.DEC:
        return state - 1;
    default:
        return state;
    }
};

const pairInitialState = {
    top: 0,
    bottom: 0,
};

const pairReducer = (state = pairInitialState, action) => {
    console.log('top:', actionFor('TOP', action));
    console.log('bottom:', actionFor('BOTTOM', action));
    state = updateProperty(
        state, 'top', counterReducer(state.top, actionFor('TOP', action))
    );

    state = updateProperty(
        state, 'bottom', counterReducer(state.bottom, actionFor('BOTTOM', action))
    );

    return state;
};

export default pairReducer;