import React from 'react';
import { random } from 'lodash';

export default function HomePage(props) {
    const { history } = props;
    const onClick = () => {
        const query = `rnd=${random(1,100)}`;
        history.push(`${history.location.pathname}?${query}`)
    };

    return (
        <div>
            <h1>Home page</h1>
            <div>
                <button onClick={onClick}>RND</button>
            </div>
        </div>
    );
}