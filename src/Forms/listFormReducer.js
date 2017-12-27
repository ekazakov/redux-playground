import types from './actions';
import {
    combine,
    combineChildren
} from '../reducer-utils/reducer-utils';
import {
    last,
    size
} from 'lodash';
import { newState } from '../utils';

const initialState = {
    app: {
        form: {
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
    },
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

const rootReducer = combine({
    app: {
        form: {
            groups: combineChildren(formReducer, {
                [`group_.`]: {
                    textA: textReducer,
                    isChecked: checkboxReducer,
                },
            })
        }
    }
});

const listFormReducer = (state = initialState, action) => {
    return rootReducer(state, action);
};

export default listFormReducer;
