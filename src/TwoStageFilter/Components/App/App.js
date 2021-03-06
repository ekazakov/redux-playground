import React from 'react';
import { combineReducers } from 'redux-loop';
import { connect } from 'react-redux';
import Navigation from '../Navigation/Navigation';
import HomePage from '../Pages/HomePage';
import * as TablePage from '../Pages/TablePage';
import OtherPage from '../Pages/OtherPage';


const pages = {
    home: HomePage,
    table: TablePage.view,
    other: OtherPage,
};

function pageReducer(state = 'home', { type }) {
    switch (type) {
    case 'HOME':
        return 'home';
    case 'TABLE':
        return 'table';
    case 'OTHER':
        return 'other';
    default:
        return state;
    }
}

export const reducer = combineReducers({
    page: pageReducer,
    tablePage: TablePage.reducer
});

function App(props) {
    const {
        app: {
            page = 'home',
        }
    } = props;
    const PageComponent = pages[page];
    return (
        <div>
            <Navigation {...props} />
            <PageComponent {...props} />
        </div>
    )
}
const stateToProps = (state) => state;

export const view = connect(stateToProps)(App);