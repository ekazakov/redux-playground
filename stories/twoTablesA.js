import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider, } from 'react-redux';
import App from '../src/TwoTablesA/Components/App';
import rootReducer from '../src/TwoTablesA/rootReducer';
import buildStore from '../src/Tables/createStore';

const stories = storiesOf('Two Table A', module);
const store = buildStore(rootReducer);

stories.add('Two tables', () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
});