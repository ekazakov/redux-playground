import React from 'react';
import Input from './Input';
import Button from './Button';
import Timer from './Timer';

export default function ConfirmationStep(props) {
    const { purchase } = props;

    function onSubmit(event) {
        event.preventDefault();
        props.onSubmit();
    }

    const {
        timeLeft,
        resendDelay,
        inProgress,
        attemptExceeded,
    } = purchase;

    const canResendCode = (
        timeLeft === 0 ||
        resendDelay === 0 ||
        attemptExceeded
    );

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Confirmation Code</label>
            </div>
            <div>
                <Input
                    value={purchase.confirmationCode}
                    onChange={props.onConfirmationCodeChange}
                />
            </div>
            <div>
                <Button
                    type="button"
                    onClick={props.confirmPurchase}
                    disabled={inProgress || purchase.attemptExceeded}
                >
                    Confirm
                </Button>
                <Timer time={purchase.timeLeft} />
            </div>
            <div>
                {purchase.confirmationErrorMsg}
            </div>
            <div>
                <Button disabled={inProgress || !canResendCode} type="button" onClick={props.resendCode}>
                    Resend code
                </Button>
                {purchase.resendDelay !== 0 && <Timer time={purchase.resendDelay}/>}
            </div>
            <div>
                <Button onClick={props.cancelPurchase}>Cancel Purchase</Button>
            </div>
        </form>
    );
}
