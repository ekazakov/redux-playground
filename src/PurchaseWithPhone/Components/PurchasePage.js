import React from 'react';
import PurchaseForm from './PurchaseForm';

export default function PurchasePage(props) {
    return (
        <div>
            <h1>Purchase Page</h1>
            <div>
               <PurchaseForm {...props} />
            </div>
        </div>
    );
}