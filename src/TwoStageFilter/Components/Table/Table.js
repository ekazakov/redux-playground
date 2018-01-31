import React from 'react';
import map from 'lodash/map';

function Row({ record }) {
    return (
        <tr>
            <td>{record.firstName}</td>
            <td>{record.lastName}</td>
            <td>{record.age}</td>
            <td>{record.city}</td>
            <td>${record.amount}</td>
        </tr>
    );
}

export const view =function Table (props) {
    const { records } = props;

    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
            {map(records, (record) => (
                <Row key={record.uuid} record={record} />
            ))}
            </tbody>
        </table>
    );
};




