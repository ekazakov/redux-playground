import React, { Component } from 'react';
import TableWithFilter from './TableWithFilter';

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <TableWithFilter namespace="tableA" />
                </div>
            </div>
        );
    }
}


export default App;
