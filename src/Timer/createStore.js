import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import { install } from 'redux-loop';

export default function _createStore(rootReducer, initialState) {
    const enhancer = composeWithDevTools(
        applyMiddleware(thunk),
        install(),
    );

    return createStore(rootReducer, initialState, enhancer);
}