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

export function delay(delayTime) {
    return new Promise(resolve => {
        setTimeout(resolve, delayTime);
    });
}

function pad(n) {
    return (n < 10) ? ('0' + n) : n;
}

export function formatTimer(time, full = false) {
    const timeInSeconds = Math.floor((time || 0) / 1000);
    const seconds = (timeInSeconds % 3600);
    const hours = (timeInSeconds - seconds) / 3600;
    const seconds2 = seconds % 60;
    const minutes = (seconds - seconds2) / 60;

    if (hours === 0 && !full) {
        return `${pad(minutes)}:${pad(seconds2)}`;
    }

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds2)}`;
}
