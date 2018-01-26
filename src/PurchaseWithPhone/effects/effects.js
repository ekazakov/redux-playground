import { delay } from '../../utils';
import { get } from 'lodash';
import { addSeconds } from 'date-fns';
import types from '../actions/actionTypes';

let confirmationAttempts = 0;

export function startPurchaseRequest() {
    confirmationAttempts = 0;
    return delay(1000)
        .then(() => ({
            id: '133456',
            validUntil: addSeconds(new Date(), 210).getTime(),
            resendAfter: addSeconds(new Date(), 60).getTime(),
        }))
    ;
}

export function confirmPurchaseRequest(code) {
    return delay(1000)
        .then(() => {
            confirmationAttempts++;
            if (confirmationAttempts > 3) {
                return Promise.reject({
                    attemptExceeded: true,
                    message: 'Confirmation attempts exceeded'
                });
            }

            if (code === '1111') {
                return Promise.resolve();
            }

            return Promise.reject({
                attemptExceeded: false,
                message: 'Wrong confirmation code'
            })
        })
    ;
}

export function resendConfirmationCode() {
    return startPurchaseRequest();
}

const timers = {};

export function startTimer(dispatch, name, until) {
    const period = until - Date.now();

    function tick() {
        const timeLeft = Math.max(timers[name].start + period - Date.now(), 0);

        if (timeLeft <= 0) {
            clearInterval(timers[name].handler);
            dispatch({
                type: types.TIMER_END,
                payload: { name, timeLeft: 0 }
            });

            return;
        }

        dispatch({
            type: types.TIMER_TICK,
            payload: { name, timeLeft, }
        });
    }

    cancelTimer(name);
    const handler = setInterval(tick, 1000);
    timers[name] = {
        handler,
        start: Date.now(),
    };
    tick();
}

export function cancelTimer(name) {
    clearInterval(get(timers, [name, 'handler']));
}