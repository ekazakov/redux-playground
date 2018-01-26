import { connectRoutes } from 'redux-first-router'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import * as reducers from './reducers';
// const history = createHistory();
const routesMap = {
    HOME: '/',
    FOO: '/foo',
    BAR: '/bar',
};


export default function configureStore(history) {
    const { reducer, middleware, enhancer } = connectRoutes(history, routesMap);
    const rootReducer = combineReducers({ ...reducers ,location: reducer  });
    const middlewares = composeWithDevTools(
        applyMiddleware(middleware)
    ) ;
    return createStore(rootReducer, compose(enhancer, middlewares));
}