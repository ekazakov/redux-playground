import types from './actions';
import {
    combine,
    combineChildren
} from '../reducer-utils/reducer-utils';
import {
    size
} from 'lodash';
import { newState } from '../utils';

const initialState = {
    app: {
        formList: {
            form_0: {
                id: 'form_0',
                groups: {
                    group_0: {
                        id: 'group_0',
                        textA: '',
                        isChecked: false,
                    },
                    group_1: {
                        id: 'group_1',
                        textA: '',
                        isChecked: false,
                    },
                },
            },
            form_1: {
                id: 'form_1',
                groups: {
                    group_0: {
                        id: 'group_0',
                        textA: '',
                        isChecked: false,
                    },
                    group_1: {
                        id: 'group_1',
                        textA: '',
                        isChecked: false,
                    },
                },
            }
        },
    }
};


const textReducer = (state, { type, payload }) => {
    if (type === types.INPUT_CHANGED) {
        return payload.value;
    }

    return state;
};

const checkboxReducer = (state, { type }) => {
    if (type === types.CHECKBOX_CHANGED) {
        return !state;
    }

    return state;
};



const formReducer = (state, action) => {
    if (action.type === types.GROUP_ADDED) {
        const lastId = size(state);
        const id = `group_${lastId}`;
        return newState(state, {
            [id]: {
                id,
                textA: '',
                isChecked: false,
            },
        });
    }

    return state;
};

const formsReducer = (state, action) => {
    if (action.type === types.FORM_ADDED) {
        const lastId = size(state);
        const id = `form_${lastId}`;
        const groups = formReducer({}, { type: types.GROUP_ADDED });
        return newState(state, {
            [id]: {
                id,
                groups,
            },
        });
    }
    return state;
};


const rootReducer = combine({
    app: {
        formList: combineChildren(formsReducer, {
            [`form_.`]: {
                groups: combineChildren(formReducer, {
                    [`group_.`]: {
                        textA: textReducer,
                        isChecked: checkboxReducer,
                    },
                }),
            },
        }),
    },
});

const listFormListReducer = (state = initialState, action) =>
    rootReducer(state, action);

export default listFormListReducer;
