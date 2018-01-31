import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider, } from 'react-redux';
import createHistory from 'history/createMemoryHistory';
import * as App from '../src/TwoStageFilter/Components/App/App';
import createStore from '../src/TwoStageFilter/createStore';
import BrowserFrame from '../src/BrowserFrame/BrowserFrame';

const stories = storiesOf('Two stage filter', module);
const history = createHistory();
const store = createStore(App.reducer, history);
// history.listen((...args) => {
//     console.log(history);
//     console.log('history change', ...args);
// });

window.memoryHistory = history;

stories.add('Table', () => {
    return (
        <BrowserFrame history={history}>
            <Provider store={store}>
                <App.view />
            </Provider>
        </BrowserFrame>
    );
});


stories.add('Browser Frame', () => {
    return (<div>
        <BrowserFrame history={history}>
            <h1>Hello</h1>
        </BrowserFrame>
    </div>);
});