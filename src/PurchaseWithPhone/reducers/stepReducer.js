import { STEP } from '../constants';
import types from '../actions/actionTypes';

export default function stepReducer(state = STEP.PHONE_ADDITION, { type }) {
    switch (type) {
    case types.CANCEL_PURCHASE:
        return STEP.PHONE_ADDITION;

    case types.START_PURCHASE_SUCCESS:
        return STEP.CONFIRMATION;

    case types.PURCHASE_SUCCESS:
        return STEP.SUCCESS;
    default:
        return state;
    }
}