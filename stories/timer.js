import React, { Children, cloneElement } from 'react';
import { Provider, connect } from 'react-redux';
import { get } from 'lodash';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import createStore from '../src/Timer/createStore';
import { combineReducers } from 'redux-loop';
import timerReducer from '../src/Timer/reducer';
import Timer from '../src/Timer/Timer';



function _ConnectToRedux ({ children, selector, state, dispatch }) {
    return Children.map(children, (element) => {
        return cloneElement(element, {
            ...get(state, selector),
            dispatch,
        });
    })
}

const ConnectToRedux = connect((state) => ({ state }))(_ConnectToRedux);
const stories = storiesOf('Timer', module);

const reducer = combineReducers({
    timerA: timerReducer,
});
const store = createStore(reducer);



stories.add('One timer', () => {

    return (
        <Provider store={store}>
            <ConnectToRedux selector="timerA">
                <Timer />
            </ConnectToRedux>
        </Provider>
    );
});

