function pageReducer(state = 'home', { type }) {
    switch (type) {
    case 'HOME':
        return 'home';
    case 'FOO':
        return 'foo';
    case 'BAR':
        return 'bar';
    default:
        return state;
    }
}

export const page = pageReducer;