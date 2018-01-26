import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect as reduxConnect} from 'react-redux'
import { curry } from 'lodash';

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

const FORWARD = '@redux-forward/FORWARD';

// wrap an action into a forward action
export const wrapTo = curry(
    (name, action) =>
        ({type: FORWARD, payload: action, meta: {name}})
);

// unwrap recursively an action
export const unwrap = (action) =>
    action && action.type === FORWARD ? unwrap(action.payload) : action;

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