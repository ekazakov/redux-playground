import { applyFilter } from '../../../utils';

const PaginationStateToProps = (state, { namespace }) => {
    const { records, filter, pagination } = state[namespace];
    return {
        ...pagination,
        size: applyFilter(records, filter).length,
    }
};

export default PaginationStateToProps;