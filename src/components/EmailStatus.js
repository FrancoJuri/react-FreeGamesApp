import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { firebase } from '../firebase/firebase-config';

const EmailStatus = () => {

    const currentUser = firebase.auth().currentUser;

    const [disabled, setDisabled] = useState(false);

    const [component, setComponent] = useState(null);
    const [textComponent, setTextComponent] = useState(null);

    const handleVerification = useCallback( async () => {
        setDisabled(true);

        try {
            await currentUser.sendEmailVerification();
            setTextComponent('Email sent');
            
            setDisabled(false);

        } catch (error) {
            console.log(error);
            Swal.fire(error.message, '', 'error');
            setDisabled(false);
        }
    }, [currentUser])

    useEffect(() => {
        if(currentUser.emailVerified){
            setTextComponent('Verified');
        }
    }, [currentUser.emailVerified, disabled, handleVerification]);

    useEffect(() => {
        if(textComponent === 'Verified'){
            setComponent(
                <div className='alert alert-success fadeIn'>
                    <h4 className='inter-font mb-0'> 
                        Your email is correctly verified!
                    </h4>
                </div>
            )
        } else if(textComponent === 'Email sent') {
            setComponent(
                <div className='alert alert-success fadeIn'>
                    <h4 className='inter-font mb-0'>
                        We have sent an email to <strong>{currentUser.email}</strong> to verify your email address, reload the page when you have completed the verification.
                    </h4>
                </div>
            )
        } else {
            setComponent(
                <div className='alert alert-danger d-flex flex-md-row justify-content-md-start align-items-md-center flex-column justify-content-center align-items-start gap-2 fadeIn'>
                    <h4 className='inter-font mb-0'>Your email is not verified!</h4>
                    <button 
                        onClick={handleVerification} 
                        className={`${(disabled) && 'disabled'} btn btn-danger inter-font`} 
                        style={{transition: 'all 270ms'}}
                        disabled={(disabled) ? true : false}
                    >
                        Verify now
                    </button>
                </div>
            )
        }
    }, [textComponent, disabled, handleVerification, currentUser.email])

    return (
        <div className='mt-5'>
            <div className='fadeIn'>
                <h2 className='montserrat-font'>Email Status</h2>
                <hr />
            </div>
            {component}
        </div>
    )
}

export default EmailStatus;