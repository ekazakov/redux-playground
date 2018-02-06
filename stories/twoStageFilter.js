import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider, } from 'react-redux';
// import createHistory from 'history/createMemoryHistory';
import history from '../src/TwoStageFilter/hisotry';
import * as App from '../src/TwoStageFilter/Components/App/App';
import createStore from '../src/TwoStageFilter/createStore';
import BrowserFrame from '../src/BrowserFrame/BrowserFrame';

const stories = storiesOf('Two stage filter', module);
// const history = createHistory({
//     initialEntries: ['/']
// });
const store = createStore(App.reducer, history);

window.memoryHistory = history;

stories.add('Table', () => {
    return (
        <BrowserFrame history={history}>
            <Provider store={store}>
                <App.view history={history} />
            </Provider>
        </BrowserFrame>
    );
});


// stories.add('Browser Frame', () => {
//     return (<div>
//         <BrowserFrame history={history}>
//             <h1>Hello</h1>
//         </BrowserFrame>
//     </div>);
// });