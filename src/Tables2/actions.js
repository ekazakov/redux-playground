const types = {
    GO_TO_PAGE: '@app/GO_TO_PAGE',
    RESET_PAGINATION: '@app/RESET_PAGINATION',
    INPUT_CHANGED: '@app/INPUT_CHANGED',
    RESET_FILTER: '@app/RESET_FILTER',
};

export default types;

function createAction(type, paramName) {
    return (namespace) => {
        return (param) => ({
            type,
            namespace,
            payload: {
                [paramName]: param,
            },
        });
    }
}

export const goToPage = createAction(types.GO_TO_PAGE, 'page');
export const resetFilter = (namespace = '') => () => ({
    type: types.RESET_FILTER,
    namespace,
});
export const inputChanged = createAction(types.INPUT_CHANGED, 'value');
