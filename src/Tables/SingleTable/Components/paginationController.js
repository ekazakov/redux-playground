import { applyFilter } from '../../../utils';

const PaginationStateToProps = (state ) => {
    const { records, filter, pagination } = state.tableA;
    return {
        ...pagination,
        size: applyFilter(records, filter).length,
    }
};

export default PaginationStateToProps;