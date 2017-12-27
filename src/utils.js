import merge from 'lodash/merge';
import filter from 'lodash/filter';
import isFunction from 'lodash/isFunction';

export function newState(state, ...restArgs) {
    const source = restArgs.map((arg) => {
        return isFunction(arg) ? arg(state) : arg;
    });

    return merge({}, state, ...source);
}

function isInRange({ from, to }, prop) {
    return (obj) => {
        const value = Number(obj[prop]);
        return (value >= from && value <= to);
    }
}

export function applyFilter(records, filterDescriptor) {
    const {
        age,
        amount,
    } = filterDescriptor;

    const conditions = [
        isInRange(age, 'age'),
        isInRange(amount, 'amount'),
    ];

    return filter(records, (record) => {
        return conditions.every((condition) => condition(record));
    });
}

export function applyPagination(records, pagination) {
    const { page, pageSize } = pagination;
    return records.slice((page - 1) * pageSize, page * pageSize);
}