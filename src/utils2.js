import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect as reduxConnect} from 'react-redux'
import {
    merge,
    set,
    compact,
    curry,
    get,
} from 'lodash';
import {
    Cmd,
    getCmd,
    getModel,
    liftState,
    loop
} from 'redux-loop';

const identity = (state) => state;

const mergeSelectors = (parentSelector, childSelector) =>
    (state) =>
        childSelector(parentSelector(state));

const computeSelector = (props, ctx) => {
    return mergeSelectors(
        ctx.selector ? ctx.selector : identity,
        props.selector ? props.selector : identity
    );
};


export const withLocalSelector = ReduxComponent => {
    class WithConnectSelector extends Component {
        constructor(props, ctx) {
            super(props, ctx);

            this.selector = computeSelector(props, ctx)
        }

        componentWillReceiveProps(nextProps, nextContext) {
            this.selector = computeSelector(nextProps, nextContext)
        }

        getChildContext() {
            return {
                selector: this.selector
            }
        }

        render() {
            return <ReduxComponent {...this.props} selector={this.selector} />
        }
    };

    WithConnectSelector.contextTypes = {
        selector: PropTypes.func
    };

    WithConnectSelector.childContextTypes = {
        selector: PropTypes.func
    };

    return WithConnectSelector;
};

const defaultMapDispatchToProps = (propsDispatch, props, dispatch) => ({ dispatch });

export const localConnect = (mapStateToProps = identity, mapDispatchToProps = defaultMapDispatchToProps) =>
    BaseComponent => {
        const reduxMapState = (state, props)  =>
            mapStateToProps(props.selector(state), props, state);

        const reduxMapDispatch = (dispatch, props) =>
            mapDispatchToProps(props.dispatch, props, dispatch);

        const reduxMergeProps = (stateProps, dispatchProps, ownProps) =>
            ({ ...stateProps, ...dispatchProps, ...ownProps });

        const ReduxComponent = reduxConnect(
            reduxMapState,
            reduxMapDispatch,
            reduxMergeProps,
            {pure: true}
        )(BaseComponent);

        return withLocalSelector(ReduxComponent)
    };

export const FORWARD = '@redux-forward/FORWARD';

// wrap an action into a forward action
export const wrapTo = curry(
    (name, action) =>
        ({type: FORWARD, payload: action, meta: {name}})
);

// unwrap recursively an action
export const unwrap = (action) =>
    action && action.type === FORWARD ? unwrap(action.payload) : action;

export const unwrapOnce = (action) =>
    action && action.type === FORWARD ? action.payload : action;

export const isActionFor = (name, action) => {
    if (isForwarded(action)) {
        return (action.meta.name === name);
    }

    return false
};

export const getActionName = (action) => get(action, 'meta.name', 'unknown');

// given a name to forward to, returns the action for that name
export const actionFor = (name, action) =>
    action && action.type === FORWARD ?
        (
            action.meta.name === name ?
                action.payload :
                undefined
        ) :
        action
;

export const isForwarded = (action) => (action && action.type === FORWARD);


// returns a new dispatch that wraps and forwards the actions with the given name
export const forwardTo = (name, dispatch) =>
    action =>
        dispatch(wrapTo(name, action))
;

export const updateProperty = (state, propName, nextPropValue) => {
    if (state[propName] === nextPropValue) {
        return state;
    }

    return {
        ...state,
        [propName]: nextPropValue
    }
};

export function newLiftedState(state, path, update) {
    const liftedState = liftState(state);
    const model = getModel(liftedState);
    const cmd = getCmd(liftedState);

    const liftedUpdate = liftState(update);
    const updateModel = getModel(liftedUpdate);
    const updateCmd = getCmd(liftedUpdate);

    const nextState = merge({}, model);
    set(nextState, path, updateModel);
    const cmdList = [cmd].concat(updateCmd);

    return loop(nextState, Cmd.list(compact(cmdList)));
}

export function switchCase(cases) {
    return (defaultCase) => (key) => {
        return (key in cases) ? cases[key] : defaultCase;
    };
}

export function executeIfFunction(func, ...args) {
    return typeof func === 'function' ? func(...args) : func;
}

export function createReducer(cases, selector = (action) => action.type) {
    return (state, action) =>
        executeIfFunction(
            switchCase(cases)(liftState(state))(selector(action)),
            state,
            action
        )
        ;
}