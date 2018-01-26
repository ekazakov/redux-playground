import React from 'react';
import Link from 'redux-first-router-link';


export default function Navigation() {
    return (
        <div>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/foo">Foo</Link>
            </div>
            <div>
                <Link to="/bar">Bar</Link>
            </div>
        </div>
    )
}