import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import createStore from '../src/Tables/createStore';
import rootReducer from '../src/Tables2/tablesReducer';
import App from '../src/Tables2/Components/App';

const stories = storiesOf('Tables2', module);

const twoTablesStore = createStore(rootReducer);

stories.add('Two tables', () => {
    return (
        <Provider store={twoTablesStore}>
            <App />
        </Provider>
    );
});