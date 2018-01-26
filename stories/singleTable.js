import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider, } from 'react-redux';
import App from '../src/Tables/SingleTable/Components/App';
import rootReducer from '../src/Tables/SingleTable/rootReducer';
import createStore from '../src/Tables/createStore';

const stories = storiesOf('Single Table', module);
const store = createStore(rootReducer);

stories.add('Table with', () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
});