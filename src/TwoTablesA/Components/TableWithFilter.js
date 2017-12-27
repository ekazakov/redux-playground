import React from 'react';
import { connect } from 'react-redux';
import Table from '../../Tables/Components/Table/Table';
import Pagination from '../../Tables/Components/Pagination/Pagination';
import Filter from '../../Tables/Components/Filter/Filter';
import {
    ageFromInputChanged,
    ageToInputChanged,
    amountFromInputChanged,
    amountToInputChanged,
    goToPage
} from '../actions';
import filterStateToProps from '../../Tables/Components/Filter/controller';
import PaginationStateToProps from '../../Tables/Components/Pagination/controller';
import TableStateToProps from '../../Tables/Components/Table/controller';

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

