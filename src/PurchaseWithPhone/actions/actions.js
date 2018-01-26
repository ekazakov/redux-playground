import types from './actionTypes';

export const startPurchase = () => ({
    type: types.START_PURCHASE,
});

export const startPurchaseSuccess = (order) => ({
    type: types.START_PURCHASE_SUCCESS,
    payload: { order },
});

export const changeConfirmationCode = (confirmationCode) => ({
    type: types.CHANGE_CONFIRMATION_CODE,
    payload: {
        confirmationCode
    },
});

export const cancelPurchase = () => ({
    type: types.CANCEL_PURCHASE,
});

export const confirmPurchase = () => ({
    type: types.CONFIRM_PURCHASE,
});

export const purchaseSuccess = () => ({
    type: types.PURCHASE_SUCCESS
});

export const purchaseFail = () => ({
    type: types.PURCHASE_FAIL,
});

export const purchaseConfirmationFail = (error) => ({
    type: types.PURCHASE_CONFIRMATION_FAILED,
    payload: {
        confirmationErrorMsg: error.message,
        attemptExceeded: error.attemptExceeded,
    }
});

export const resendConfirmationCode = () => ({
    type: types.RESEND_CONFIRMATION_CODE,
});

export const changePhone = (phone) => ({
    type: types.CHANGE_PHONE,
    payload: {
        phone,
    }
});
