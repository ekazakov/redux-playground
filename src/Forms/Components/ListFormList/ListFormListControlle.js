import { connect } from 'react-redux';
import { flow } from 'lodash';
import {
    checkboxChanged,
    groupAdded,
    formAdded,
    inputChanged
} from '../../actions';

export const stateToProps = (state) => state;

export const dispatchToProps = (dispatch) => ({
    onInputChange: (ns1) => (ns2) => flow(
        inputChanged(`app:formList:${ns1}:groups:${ns2}:textA`),
        dispatch
    ),
    onCheckboxChanged: (ns1) => (ns2) => flow(
        checkboxChanged(`app:formList:${ns1}:groups:${ns2}:isChecked`),
        dispatch,
    ),
    onAddGroupClick: (ns) => flow(
        groupAdded(`app:formList:${ns}:groups`),
        dispatch
    ),
    onAddFormClick: flow(
        formAdded('app:formList'),
        dispatch
    )
});

export const connectListFormList = connect(stateToProps, dispatchToProps);