import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

export default function createStore(reducer, initialState) {
    const enhancer = composeWithDevTools(
        applyMiddleware(thunk),
    );

    return reduxCreateStore(reducer, initialState, enhancer);
}