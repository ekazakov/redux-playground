export default function pageReducer(state = 'home', { type }) {
    switch (type) {
    case 'HOME':
        return 'home';
    case 'PURCHASE':
        return 'purchase';
    default:
        return state;
    }
}

