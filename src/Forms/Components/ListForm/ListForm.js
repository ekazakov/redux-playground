import React from 'react';
import { map } from 'lodash';
import Input from '../../../CommonComponents/Input';

export default function ListForm(props) {
    const {
        form,
        onInputChange,
        onCheckboxChanged,
        onAddGroupClick,
    } = props;

    return (
        <form>
            <h2>Dumb form</h2>
            {map(form.groups, (group) => (
                <div key={group.id}>
                    <label>Some input </label>
                    <Input
                        value={group.textA}
                        onChange={onInputChange(group.id)}
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={group.isChecked}
                            onChange={onCheckboxChanged(group.id)}
                        />
                        check me!
                    </label>
                </div>
            ))}
            <div>
                <button
                    type="button"
                    onClick={onAddGroupClick}
                >
                    Add Group
                </button>
            </div>
        </form>
    );
}



