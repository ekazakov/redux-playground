import React from 'react';
import { connect } from 'react-redux';
import { OnlyMatch, Case } from 'react-matcher';
import { STEP } from '../constants';
import {
    confirmPurchase,
    startPurchase,
    changePhone,
    changeConfirmationCode,
    resendConfirmationCode,
    cancelPurchase,
} from '../actions/actions'
import AddPhoneStep from './AddPhoneStep';
import ConfirmationStep from './ConfirmationStep';
import FinishStep from './FinishStep';

function PurchaseForm(props) {
    const { step } = props;
    return (
        <div>
            <OnlyMatch value={step}>
                <Case value={STEP.PHONE_ADDITION}>
                    <AddPhoneStep
                        {...props}
                        onSubmit={props.startPurchase}
                        onPhoneChange={props.changePhone}
                    />
                </Case>
                <Case value={STEP.CONFIRMATION}>
                    <ConfirmationStep
                        {...props}
                        onSubmit={props.confirmPurchase}
                        confirmPurchase={props.confirmPurchase}
                        onConfirmationCodeChange={props.changeConfirmationCode}
                        resendCode={props.resendConfirmationCode}
                    />
                </Case>
                <Case value={STEP.SUCCESS}>
                    <FinishStep {...props} />
                </Case>
            </OnlyMatch>
        </div>
    );
}
const stateToProps = (state) => state;
const actions = {
    confirmPurchase,
    startPurchase,
    changePhone,
    changeConfirmationCode,
    resendConfirmationCode,
    cancelPurchase,
};
export default connect(stateToProps, actions)(PurchaseForm);
