import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import createStore from '../src/Forms/createStore';
import listFormReducer from '../src/Forms/listFormReducer';
import { bindToRedux } from '../src/Forms/Components/ListForm/ListFormController';
import ListForm from '../src/Forms/Components/ListForm/ListForm';
import ListFormList from '../src/Forms/Components/ListFormList/ListFormList';
import listFormListReducer from '../src/Forms/listFormListReducer';
import { connectListFormList } from '../src/Forms/Components/ListFormList/ListFormListControlle';

const stories = storiesOf('Forms', module);

const ConnectedListForm = bindToRedux(ListForm);
const listFormStore = createStore(listFormReducer);
stories.add('List form', () => {
    return (
        <Provider store={listFormStore}>
            <ConnectedListForm namespace="app:form" />
        </Provider>
    );
});

const ConnectedListFormList = connectListFormList(ListFormList);
const listFormListStore = createStore(listFormListReducer);
stories.add('List of forms', () => {
    return (
        <Provider store={listFormListStore}>
            <ConnectedListFormList />
        </Provider>
    );
});