import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { firebase } from '../firebase/firebase-config';
import useForm from '../hooks/useForm';
import validator from 'validator';

const UpdatePassword = () => {

    const currentUser = firebase.auth().currentUser;

    const [buttonLoading, setButtonLoading] = useState(false);

    const [formValues, handleInputChange, reset] = useForm({
        currentPassword: '',
        password1: '',
        password2: '',
    })

    const { currentPassword, password1, password2 } = formValues;

    const changePassword = () => {
        setButtonLoading(true);
        if(!validator.equals(password1.trim(), password2.trim())){
            Swal.fire('Passwords do not match', '', 'error');
            setButtonLoading(false);
            return;
        } else if(password1.length < 8){
            Swal.fire('Password should be at least 8 characters', '', 'error');
            setButtonLoading(false);
            return;
        }

        currentUser.updatePassword(password1.trim()).then(() => {
            Swal.fire('Your password has been successfully updated', '', 'success');
        }).catch((err) => {
            Swal.fire('An error has occurred updating your password, try again later', '', 'error');
            console.log(err);
        }).finally(() => {
            reset();
            setButtonLoading(false);
        })
    }

    const handleSubmit = async () => {
        if(!currentPassword.trim().length){
            return;
        }

        try {
            setButtonLoading(true);
            await firebase.auth().signInWithEmailAndPassword(currentUser.email, currentPassword);
            changePassword();
        } catch (error) {
            setButtonLoading(false);
            Swal.fire(error.message, '', 'error');
        }
    }

    return (
        <div className='mt-5'>
            <h2 className='montserrat-font'>
                Update Password&nbsp;
            </h2>
            {
                (currentUser.providerData.length === 1)
                ?
                (currentUser.providerData[0].providerId !== 'password')
                ?
                <small className='text-muted' style={{fontSize: '20px'}}>
                    (You cannot change your password because of you have signed in with Google)
                </small>
                :
                <small className='text-muted' style={{fontSize: '20px'}}>
                    (The password must be at least 8 characters)
                </small>
                :
                <small className='text-muted' style={{fontSize: '20px'}}>
                    (The password must be at least 8 characters)
                </small>
            }
            <hr />
            <form className='w-100 change-password-form' onSubmit={(e) => {
                e.preventDefault()
            }}>
                <fieldset 
                    className='form-floating d-flex flex-md-row flex-column gap-2'
                    disabled={
                        (currentUser.providerData.length === 1)
                        &&
                        (currentUser.providerData[0].providerId !== 'password') ? true : false
                    }
                >
                    <input 
                        type='password' 
                        className='form-control bg-dark text-white inter-font' 
                        id='floatingInputValue' 
                        autoComplete='off'
                        name='currentPassword'
                        value={currentPassword}
                        onChange={handleInputChange}
                    />
                    <label className='pb-5' style={{color: 'rgb(191, 203, 212)'}} htmlFor='floatingInputValue'>
                        Current password
                    </label>
                </fieldset>
            </form>

            <form className='w-100 change-password-form mt-3' onSubmit={(e) => {
                e.preventDefault();
            }}>
                <fieldset 
                    className='form-floating d-flex flex-md-row flex-column gap-2'
                    disabled={
                        (currentUser.providerData.length === 1)
                        &&
                        (currentUser.providerData[0].providerId !== 'password') ? true : false
                    }
                >
                    <input 
                        type='password' 
                        className='form-control bg-dark text-white inter-font' 
                        id='floatingInputValue' 
                        autoComplete='off'
                        name='password1'
                        value={password1}
                        onChange={handleInputChange}
                    />
                    <label className='pb-5' style={{color: 'rgb(191, 203, 212)'}} htmlFor='floatingInputValue'>
                        New password
                    </label>
                </fieldset>
            </form>

            <form className='w-100 change-password-form mt-3' onSubmit={(e) => {
                e.preventDefault();
            }}>
                <fieldset 
                    className='form-floating d-flex flex-md-row flex-column gap-2'
                    disabled={
                        (currentUser.providerData.length === 1)
                        &&
                        (currentUser.providerData[0].providerId !== 'password') ? true : false
                    }
                >
                    <input 
                        type='password' 
                        className='form-control bg-dark text-white inter-font' 
                        id='floatingInputValue' 
                        autoComplete='off'
                        name='password2'
                        value={password2}
                        onChange={handleInputChange}
                    />
                    <label className='pb-5' style={{color: 'rgb(191, 203, 212)'}} htmlFor='floatingInputValue'>
                        Confirm password
                    </label>
                </fieldset>
            </form>

            <button 
                type='submit' 
                className={`${
                    (currentUser.providerData.length === 1)
                    &&
                    (currentUser.providerData[0].providerId !== 'password') && 'disabled'
                } password-submit-button save-changes px-md-3 px-4 py-3 mt-3`}
                disabled={
                    (buttonLoading) ? true : false
                }
                onClick={handleSubmit}
            >
                Update
            </button>
            
        </div>
    )
}

export default UpdatePassword;