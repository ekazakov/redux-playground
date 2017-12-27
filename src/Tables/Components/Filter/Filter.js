import React from 'react';
import Range from '../../../CommonComponents/Range';

export default function Filter(props) {
    const {
        age,
        amount,
        ageFromInputChanged,
        ageToInputChanged,
        amountFromInputChanged,
        amountToInputChanged,
    } = props;

    return (
        <div>
            <div>
                <h4>Filter</h4>
            </div>
            <Range
                label="Age" {...age}
                onFromChange={ageFromInputChanged}
                onToChange={ageToInputChanged}
            />
            <Range
                label="Amount" {...amount}
                onFromChange={amountFromInputChanged}
                onToChange={amountToInputChanged}
            />
        </div>
    );
}
