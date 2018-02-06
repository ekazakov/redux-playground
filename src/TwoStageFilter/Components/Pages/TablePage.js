import React from 'react';
import * as TableWithFilter from '../TableWithFilter/TableWithFilter';
import { newState } from '../../../utils';
import { getModel, getCmd, loop } from 'redux-loop'
const initialState = TableWithFilter.initialState;

export function reducer(state = initialState, action) {
    const table = TableWithFilter.reducer(state, action);
    return loop(
        newState(
            state,
            getModel(table)
        ),
        getCmd(table)
    );
}

function TablePage(props) {
    return (
        <div>
            <h1>Table page</h1>
            <div>
                <TableWithFilter.view
                    {...props}
                    selector={(state) => state.app.tablePage}
                />
            </div>
        </div>
    );
}

export const view = TablePage;
