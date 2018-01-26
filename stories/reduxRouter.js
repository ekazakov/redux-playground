import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import createHistory from 'history/createMemoryHistory';
import App from '../src/ReduxRouter/Components/App';
import configureStore from '../src/ReduxRouter/configureStore';
const stories = storiesOf('Redux First Router', module);
const history = createHistory();
window._history = history;
const store = configureStore(history);

stories.add('Simple', () => {
   return (
       <Provider store={store}>
           <App />
       </Provider>
   );
});