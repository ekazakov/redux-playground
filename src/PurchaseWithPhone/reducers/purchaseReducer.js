import { loop, Cmd } from 'redux-loop';
import types from '../actions/actionTypes';
import { newState } from '../../utils';
import {
    purchaseConfirmationFail,
    purchaseSuccess,
    startPurchaseSuccess
} from '../actions/actions';
import {
    cancelTimer,
    confirmPurchaseRequest,
    startPurchaseRequest,
    startTimer
} from '../effects/effects';
import { PURCHASE_STATUS } from '../constants';

const cancelPurchaseTimerCmd = Cmd.run(cancelTimer, {
    args: ['purchaseTimer']
});
const cancelResendTimerCmd = Cmd.run(cancelTimer, {
    args: ['resendTimer']
});

const initialState = {
    purchaseStatus: PURCHASE_STATUS.NONE,
    phone: '',
    timeLeft: null,
    confirmationCode: '',
    resendDelay: null,
    inProgress: false,
    order: null,
    attemptExceeded: false,
    confirmationErrorMsg: '',
};
export default function purchaseReducer(state = initialState, { type, payload }) {
    switch (type) {
    case types.CHANGE_PHONE:
        return newState(state, {
            phone: payload.phone,
        });

    case types.RESEND_CONFIRMATION_CODE:
    case types.START_PURCHASE:
        return loop(
            newState(state, {
                inProgress: true,
                attemptExceeded: false,
                confirmationErrorMsg: '',
            }),
            Cmd.run(startPurchaseRequest, {
                successActionCreator: startPurchaseSuccess
            })
        );

    case types.START_PURCHASE_SUCCESS:
        return loop(
            newState(state, {
                purchaseStatus: PURCHASE_STATUS.AWAIT_CONFIRMATION,
                inProgress: false,
                order: payload.order,
            }),
            Cmd.list([
                Cmd.run(startTimer, {
                    args: [
                        Cmd.dispatch, 'purchaseTimer', payload.order.validUntil
                    ]
                }),
                Cmd.run(startTimer, {
                    args: [
                        Cmd.dispatch, 'resendTimer', payload.order.resendAfter,
                    ]
                })
            ])
        );

    case types.TIMER_TICK:
        return (() => {
            if (payload.name === 'purchaseTimer') {
                return newState(state, {
                    timeLeft: payload.timeLeft,
                });
            }

            if (payload.name === 'resendTimer') {
                return newState(state, {
                    resendDelay: payload.timeLeft,
                });
            }
        })();

    case types.TIMER_END:
        return (() => {
            if (payload.name === 'purchaseTimer') {
                return newState(state, {
                    timeLeft: payload.timeLeft,
                    confirmationErrorMsg: 'Confirmation code expired',
                });
            }

            if (payload.name === 'resendTimer') {
                return newState(state, {
                    resendDelay: payload.timeLeft,
                });
            }
        })();

    case types.CHANGE_CONFIRMATION_CODE:
        return newState(state, {
            confirmationCode: payload.confirmationCode,
            confirmationErrorMsg: '',
        });

    case types.CONFIRM_PURCHASE:
        return loop(
            newState(state, {
                inProgress: true,
                confirmationErrorMsg: '',
            }),
            Cmd.run(confirmPurchaseRequest, {
                successActionCreator: purchaseSuccess,
                failActionCreator: purchaseConfirmationFail,
                args: [
                    state.confirmationCode,
                ]
            })
        );

    case types.PURCHASE_SUCCESS:
        return loop(
            newState(state, {
                inProgress: false,
                purchaseStatus: PURCHASE_STATUS.SUCCEEDED,
            }),
            Cmd.list([
                cancelPurchaseTimerCmd,
                cancelResendTimerCmd,
            ])
        );

    case types.PURCHASE_CONFIRMATION_FAILED:
        return loop(
            newState(state, {
                inProgress: false,
                confirmationErrorMsg: payload.confirmationErrorMsg,
                attemptExceeded: payload.attemptExceeded,
                timeLeft: payload.attemptExceeded ? 0 : state.timeLeft,
            }),
            payload.attemptExceeded ? cancelPurchaseTimerCmd : Cmd.none,
        );

    case types.CANCEL_PURCHASE:
    case types.RESET:
        return loop(
            initialState,
            Cmd.list([
                cancelPurchaseTimerCmd,
                cancelResendTimerCmd,
            ])
        );

    default:
        return state;
    }
}