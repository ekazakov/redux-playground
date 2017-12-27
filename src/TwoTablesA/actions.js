const types = {
    GO_TO_PAGE: '@app/GO_TO_PAGE',
    RESET_PAGINATION: '@app/RESET_PAGINATION',

    // как удачно мы ввели префикс filter
    AGE_FROM_INPUT_CHANGED: '@app/filter/AGE_FROM_INPUT_CHANGED',
    AGE_TO_INPUT_CHANGED: '@app/filter/AGE_TO_INPUT_CHANGED',

    AMOUNT_FROM_INPUT_CHANGED: '@app/filter/AMOUNT_FROM_INPUT_CHANGED',
    AMOUNT_TO_INPUT_CHANGED: '@app/filter/AMOUNT_TO_INPUT_CHANGED',
};

export default types;

function createAction(type, paramName) {
    return (param) => ({
        type,
        payload: {
            [paramName]: param,
        }
    });
}

export const goToPage = createAction(types.GO_TO_PAGE, 'page');
export const ageFromInputChanged = createAction(types.AGE_FROM_INPUT_CHANGED, 'value');
export const ageToInputChanged = createAction(types.AGE_TO_INPUT_CHANGED, 'value');
export const amountFromInputChanged = createAction(types.AMOUNT_FROM_INPUT_CHANGED, 'value');
export const amountToInputChanged = createAction(types.AMOUNT_TO_INPUT_CHANGED, 'value');
