import React from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import HomePage from './HomePage';
import PurchasePage from './PurchasePage';

const pages = {
    home: HomePage,
    purchase: PurchasePage,
};

function App(props) {
    const { page = 'home' } = props;
    const PageComponent = pages[page];
    return (
        <div>
            <Navigation {...props} />
            <PageComponent {...props} />
        </div>
    )
}
const stateToProps = (state) => state;

export default connect(stateToProps)(App);