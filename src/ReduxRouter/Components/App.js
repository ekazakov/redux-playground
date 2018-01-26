import { connect } from 'react-redux';
import React from 'react';
import Navigation from './Navigation';
import HomePage from './HomePage';
import FooPage from './FooPage';
import BarPage from './BarPage';

const pages = {
    home: HomePage,
    foo: FooPage,
    bar: BarPage,
};

function App(props) {
    console.log('props', props);
    const { page = 'home' } = props;
    const PageComponent = pages[page];
    return (
        <div>
            <Navigation />
            <PageComponent />
        </div>
    )
}
const stateToProps = (state) => state;

export default connect(stateToProps)(App);