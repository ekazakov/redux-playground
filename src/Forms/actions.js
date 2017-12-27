const types = {
    INPUT_CHANGED: '@app/INPUT_CHANGED',
    CHECKBOX_CHANGED: '@app/CHECKBOX_CHANGED',
    GROUP_ADDED: '@app/GROUP_ADDED',
    FORM_ADDED: '@app/FORM_ADDED',
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

export const inputChanged = createAction(types.INPUT_CHANGED, 'value');
export const checkboxChanged = (namespace) => () => ({
    type: types.CHECKBOX_CHANGED,
    namespace,
});

export const groupAdded = (namespace) => () => ({
    type: types.GROUP_ADDED,
    namespace,
});
export const formAdded = (namespace) => () => ({
    type: types.FORM_ADDED,
    namespace,
});