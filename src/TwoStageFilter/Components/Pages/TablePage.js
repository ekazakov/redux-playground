import React from 'react';
import * as TableWithFilter from '../TableWithFilter/TableWithFilter';

export default function TablePage() {
    return (
        <div>
            <h1>Table page</h1>
            <div>
                <TableWithFilter.view selector={(state) => state.app.table} />
            </div>
        </div>
    );
}