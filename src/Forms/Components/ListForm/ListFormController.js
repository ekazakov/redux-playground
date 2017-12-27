import { connect } from 'react-redux';
import { flow, get } from 'lodash';
import {
    checkboxChanged,
    groupAdded,
    inputChanged
} from '../../actions';

export const stateToProps = (state, { namespace }) => {
    return { form: get(state, namespace.split(':')) };
};
export const dispatchToProps = (dispatch, { namespace }) => ({
    onInputChange: (ns) => flow(
        inputChanged(`${namespace}:groups:${ns}:textA`),
        dispatch
    ),
    onCheckboxChanged: (ns) => flow(
        checkboxChanged(`${namespace}:groups:${ns}:isChecked`),
        dispatch,
    ),
    onAddGroupClick: flow(
        groupAdded(`${namespace}:groups`),
        dispatch
    ),
});

export const bindToRedux = connect(stateToProps, dispatchToProps);
