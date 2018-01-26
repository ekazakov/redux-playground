import React from 'react';
import { connect } from 'react-redux';
import Table from '../../Components/Table/Table';
import Pagination from '../../Components/Pagination/Pagination';
import Filter from '../../Components/Filter/Filter';
import {
    ageFromInputChanged,
    ageToInputChanged,
    amountFromInputChanged,
    amountToInputChanged,
    goToPage
} from '../actions';
import filterStateToProps from './filterController';
import PaginationStateToProps from './paginationController';
import TableStateToProps from './tableController';

const ConnectedTable = connect(TableStateToProps)(Table);
const paginationActions = { onPageClick: goToPage };
const ConnectedPagination = connect(PaginationStateToProps, paginationActions)(Pagination);
const filterAction = {
    ageFromInputChanged,
    ageToInputChanged,
    amountFromInputChanged,
    amountToInputChanged,
};
const ConnectedFilter = connect(filterStateToProps, filterAction)(Filter);

const style = {
    display: 'flex',
};

export default function TableWithFilter() {
    return (
        <div style={style}>
            <div>
                <ConnectedTable />
                <ConnectedPagination />
            </div>
            <div>
                <ConnectedFilter />
            </div>
        </div>
    );
}

