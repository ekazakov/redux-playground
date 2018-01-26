import {
    applyFilter,
    applyPagination
} from '../../../utils';

const TableStateToProps = (state) => {
    const { records, filter, pagination } = state.tableA;

    return {
        records: applyPagination(
            applyFilter(records, filter),
            pagination
        ),
    }
};

export default TableStateToProps;
