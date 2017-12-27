import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider, } from 'react-redux';
import App from '../src/SingleTable/Components/App';
import rootReducer from '../src/SingleTable/rootReducer';
import createStore from '../src/Tables/createStore';

const stories = storiesOf('Single Table', module);
const store = createStore(rootReducer);

stories.add('Single table', () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
});