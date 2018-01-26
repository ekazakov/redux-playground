import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import createStore from '../src/Counters/createStore';
import rootReducer from '../src/Counters/rootReducer';
import { CountersPair } from '../src/Counters/Components/CountersPair';
const stories = storiesOf('Counters', module);

const store = createStore(rootReducer);

stories.add('Counters', () => {
    return (
        <Provider store={store}>
            <div>
                <CountersPair/>
            </div>
        </Provider>
    );
});