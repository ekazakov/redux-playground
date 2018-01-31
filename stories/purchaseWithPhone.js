import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import createHistory from 'history/createMemoryHistory';
import App from '../src/PurchaseWithPhone/Components/App';
import configureStore from '../src/PurchaseWithPhone/configureStore';
const stories = storiesOf('Purchase With Phone', module);
const history = createHistory();
window._history = history;
const store = configureStore(history);

history.listen((...args) => {
    console.log('history change', ...args);
});
stories.add('Purchase', () => {
   return (
       <Provider store={store}>
           <App />
       </Provider>
   );
});