import {
    createStore as reduxCreateStore,
    applyMiddleware,
    compose
} from 'redux'
import { connectRoutes } from 'redux-first-router'
import {
    combineReducers,
    install
} from 'redux-loop';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import queryString from 'query-string'

const routesMap = {
    HOME: '/',
    TABLE: '/table',
    OTHER: '/other',
};

export default function createStore(appRootReducer, history) {
    const { reducer, middleware, enhancer } = connectRoutes(
        history,
        routesMap,
        { querySerializer: queryString }
    );

    const rootReducer = combineReducers({
        location: reducer,
        app: appRootReducer,
    });

    const middlewares = composeWithDevTools(
        applyMiddleware(middleware),
        install(),
    );

    return reduxCreateStore(rootReducer, compose(enhancer, middlewares));
}