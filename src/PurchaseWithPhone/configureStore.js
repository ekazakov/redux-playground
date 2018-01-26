import { createStore, applyMiddleware, compose } from 'redux'
import { connectRoutes } from 'redux-first-router'
import { combineReducers, install } from 'redux-loop';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import pageReducer from './reducers/pageReducer';
import stepReducer from './reducers/stepReducer';
import purchaseReducer from './reducers/purchaseReducer';
// const history = createHistory();
const routesMap = {
    HOME: '/',
    PURCHASE: '/purchase',
};


export default function configureStore(history) {
    const { reducer, middleware, enhancer } = connectRoutes(history, routesMap);
    const rootReducer = combineReducers({
        location: reducer,
        page: pageReducer,
        step: stepReducer,
        purchase: purchaseReducer,
    });
    const middlewares = composeWithDevTools(
        applyMiddleware(middleware),
        install(),
    ) ;
    return createStore(rootReducer, compose(enhancer, middlewares));
}