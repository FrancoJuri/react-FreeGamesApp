import React, { useRef } from 'react';
import useForm from '../hooks/useForm';
import { firebase } from '../firebase/firebase-config';
import Swal from 'sweetalert2';

const UpdateEmail = () => {

    const currentUser = firebase.auth().currentUser;

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 1500
    })

    const currentEmail = useRef(currentUser.email); 
    
    const [formValues, handleInputChange] = useForm({
        email: currentUser.email,
    })

    const { email } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentEmail.current.toLowerCase() === email.toLowerCase()){
            return;
        }

        Swal.fire({
            title: 'Enter your password to update your email',
            input: 'password',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: async (password) => {
                return firebase.auth().signInWithEmailAndPassword(currentEmail.current, password).catch((err) => {
                    Swal.showValidationMessage(err)
                })
            }
        }).then((result) => {
            if(result.isConfirmed){
                currentUser.updateEmail(email).then(() => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Your email was updated successfuly',
                    })
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500)
                }).catch((err) => {
                    Swal.fire(err.message, '', 'error');
                })
            }
        })
    }

    return (
        <div className='mt-5'>
            <h2 className='montserrat-font'>
                Update Email&nbsp;
            </h2>
            {
                (currentUser.providerData.length === 1)
                &&
                (currentUser.providerData[0].providerId !== 'password')
                &&
                <small className='text-muted' style={{fontSize: '20px'}}>
                    (You cannot change your email because of you have signed in with Google)
                </small>
            }
            <hr />
            <form id='change-email-form' className='w-100' onSubmit={handleSubmit}>
                <fieldset 
                    className='form-floating d-flex flex-md-row flex-column gap-2'
                    disabled={
                        (currentUser.providerData.length === 1)
                        &&
                        (currentUser.providerData[0].providerId !== 'password') ? true : false
                    }
                >
                    <input 
                        type='email' 
                        className='form-control bg-dark text-white inter-font' 
                        id='floatingInputValue' 
                        autoComplete='off'
                        name='email'
                        value={email}
                        onChange={handleInputChange}
                    />
                    <label className='pb-5' style={{color: 'rgb(191, 203, 212)'}} htmlFor='floatingInputValue'>Email</label>
                    <button 
                        type='submit' 
                        className={`${
                            (currentUser.providerData.length === 1)
                            &&
                            (currentUser.providerData[0].providerId !== 'password') && 'disabled'
                        } save-changes px-md-3 px-4 py-3`}
                        disabled={
                            (currentUser.providerData.length === 1)
                            &&
                            (currentUser.providerData[0].providerId !== 'password') ? true : false
                        }
                    >
                        Update
                    </button>
                </fieldset>
            </form>

        </div>
    )
}

export default UpdateEmail;