import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

export default function buildStore(reducer, initialState) {
    const enhancer = composeWithDevTools(
        applyMiddleware(thunk),
    );

    return createStore(reducer, initialState, enhancer);
}