import isEmpty from 'lodash/isEmpty';
import {
    includes,
    memoize
} from 'lodash';

export function wrapReducer(originalReducer, ns) {
    return (state, action) => {
        const reg = new RegExp(`^${ns}`);
        const isMatches = reg.test(action.namespace);

        if (!isEmpty(action.namespace) && !isMatches) {
            return state;
        }

        return originalReducer(state, action, ns);
    }
}

export function combineChildren(reducer, children) {
    const childReducer = memoize((ns) => {
        return combine(children, ns);
    });

    return (state, action, ns) => {
        if (!ns) {
            return state;
        }

        const parentState = reducer(state, action, ns);
        const childState = childReducer(ns)(parentState, action);

        if (childState === parentState) {
            return parentState;
        }

        return Object.assign({}, parentState, childState);
    };
}

function combineReducers(reducers, namespace) {
    const finalReducerKeys = Object.keys(reducers);

    return function combination(state = {}, action) {
        const nextState = Object.assign({}, state);
        let hasChanged = false;

        for (let i = 0; i < finalReducerKeys.length; i++) {
            const key = finalReducerKeys[i];
            const reducer = reducers[key];

            if (includes(key, '.')) {
                if (!namespace || !action.namespace) {
                    continue;
                }
                const actionKey = getFirstSegment(
                    subtractFromStart(action.namespace, namespace)
                );
                const reg = new RegExp(`^${key}`);
                const stateKeys = Object.keys(state);

                stateKeys.forEach((prop) => {
                    const previousStateForProp = state[prop];
                    if (reg.test(prop) && prop === actionKey) {
                        const nextStateForProp = reducer(previousStateForProp, action);
                        nextState[prop] = nextStateForProp;

                        if (nextStateForProp !== previousStateForProp) {
                            hasChanged = true;
                        }
                    } else {
                        nextState[prop] = previousStateForProp;
                    }
                });
            } else {
                const previousStateForKey = state[key];
                const nextStateForKey = reducer(previousStateForKey, action);
                nextState[key] = nextStateForKey;
                hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
            }

        }
        return hasChanged ? nextState : state
    };
}

export function combine(target, namespace = '') {
    const keys = Object.keys(target);
    const finalReducers = keys.reduce((result, key) => {
        const value = target[key];
        const ns = namespace ? `${namespace}:${key}` : key;

        if (typeof value === 'function') {
            result[key] = wrapReducer(value, ns);
        } else {
            result[key] = combine(value, ns)
        }

        return result;
    }, {});

    return combineReducers(finalReducers, namespace);
}

export function isStartsWith(target, source) {
    if (source.length > target.length) {
        return false;
    }

    // const target = targetNs.split(':');
    // const source = sourceNs.split(':');

    return source.every((key, index) => {
        if (includes(key, '.')) {
            const reg = new RegExp(`^${key}`);
            return reg.test(target[index]);
        }

        return key === target[index];
    });
}

export function subtractFromStart(targetNs, sourceNs) {
    if (sourceNs.length > targetNs.length) {
        return '';
    }

    const target = targetNs.split(':');
    const source = sourceNs.split(':');
    const success = source.every((key) => {
        const targetKey = target.shift();

        if (includes(key, '.')) {
            const reg = new RegExp(`^${key}`);
            return reg.test(targetKey);
        }

        return key === targetKey;
    });

    return (success ? target.join(':') : '');
}

export function getFirstSegment(ns) {
    if (!ns) {
        return null;
    }
    return (ns.split(':')[0] || null);
}