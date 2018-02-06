import queryString from 'query-string';
import history from './hisotry';

export function addToQuery(params) {
    const {
        location: {
            pathname,
            search
        }
    } = history;

    const query = queryString.parse(search);
    const nextQuery = {
        ...query,
        ...params,
    };
    history.push(`${pathname}?${queryString.stringify(nextQuery)}`)
}