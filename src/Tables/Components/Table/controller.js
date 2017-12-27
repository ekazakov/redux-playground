import {
    applyFilter,
    applyPagination
} from '../../../utils';

const TableStateToProps = (state, { namespace }) => {
    const { records, filter, pagination } = state[namespace];

    return {
        records: applyPagination(
            applyFilter(records, filter),
            pagination
        ),
    }
};

export default TableStateToProps;
