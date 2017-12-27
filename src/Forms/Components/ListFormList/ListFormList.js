import React from 'react';
import { map } from 'lodash';
import ListForm from '../ListForm/ListForm';

export default function ListFormList(props) {
    const {
        app,
        onInputChange,
        onCheckboxChanged,
        onAddGroupClick,
        onAddFormClick,
    } = props;

    return (
        <div>
            {map(app.formList, (form) => (
                <div key={form.id}>
                    <ListForm
                        form={form}
                        onInputChange={onInputChange(form.id)}
                        onCheckboxChanged={onCheckboxChanged(form.id)}
                        onAddGroupClick={onAddGroupClick(form.id)}
                    />
                </div>
            ))}
            <div style={{ borderTop: '1px', margin: 10, padding: 10 }}>
                <button onClick={onAddFormClick}>Add form</button>
            </div>
        </div>
    );
}