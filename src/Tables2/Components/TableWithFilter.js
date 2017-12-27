import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Table from '../../Tables/Components/Table/Table';
import Pagination from '../../Tables/Components/Pagination/Pagination';
import Filter from '../../Tables/Components/Filter/Filter';
import {
    inputChanged,
    goToPage,
    resetFilter
} from '../actions';
import filterStateToProps from '../../Tables/Components/Filter/controller';
import PaginationStateToProps from '../../Tables/Components/Pagination/controller';
import TableStateToProps from '../../Tables/Components/Table/controller';

const ConnectedTable = connect(TableStateToProps)(Table);
const ConnectedPagination = connect(PaginationStateToProps, (dispatch, { namespace }) => {
    const actions = {
        onPageClick: goToPage(`${namespace}:pagination`),
    };
    return bindActionCreators(actions, dispatch);
})(Pagination);

const ConnectedFilter = connect(filterStateToProps, (dispatch, { namespace }) => {
    const actions = {
        ageFromInputChanged: inputChanged(`${namespace}:filter:age:from`),
        ageToInputChanged: inputChanged(`${namespace}:filter:age:to`),
        amountFromInputChanged: inputChanged(`${namespace}:filter:amount:from`),
        amountToInputChanged: inputChanged(`${namespace}:filter:amount:to`),
        reset: resetFilter(`${namespace}:filter`),
    };

    return bindActionCreators(actions, dispatch);
})(Filter);

const style = {
    display: 'flex',
};

export default function TableWithFilter(props) {
    const { namespace } = props;
    return (
        <div style={style}>
            <div>
                <ConnectedTable namespace={namespace} />
                <ConnectedPagination namespace={namespace} />
            </div>
            <div>
                <ConnectedFilter namespace={namespace} />
            </div>
        </div>
    );
}

