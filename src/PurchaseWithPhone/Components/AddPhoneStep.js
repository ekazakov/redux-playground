import React from 'react';
import Input from './Input';
import Button from './Button';

export default function AddPhoneStep (props) {
    const { purchase } = props;
    function onSubmit(event) {
        event.preventDefault();
        props.onSubmit();
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Phone</label>
            </div>
            <div>
                <Input
                    value={purchase.phone}
                    onChange={props.onPhoneChange}
                />
            </div>
            <div>
                <Button type="submit">
                    Purchase
                </Button>
            </div>
        </form>
    );
}
