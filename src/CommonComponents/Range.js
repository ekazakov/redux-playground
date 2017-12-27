import React from 'react';
import Input from './Input';

const inputStyle = {};
const groupStyle = {};

function Range(props) {
    const { 
        label, 
        from, 
        to,
        onFromChange,
        onToChange,
    } = props;

    return (
        <div>
            <div>
                {label}  
            </div>
            <div>
                <div>
                    From: <Input value={from} onChange={onFromChange} />
                </div>
                <div>
                    To: <Input value={to} onChange={onToChange} />
                </div>
            </div>
        </div>
    );
}

export default Range;