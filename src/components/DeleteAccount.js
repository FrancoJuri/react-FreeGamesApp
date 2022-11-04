import React from 'react';
import Swal from 'sweetalert2';
import { firebase, googleAuthProvider, usersRef } from '../firebase/firebase-config';

const DeleteAccount = ({userInfo}) => {

    const currentUser = firebase.auth().currentUser;

    const handleDelete = () => {
        if(currentUser.providerData[0].providerId === 'password' || currentUser.providerData[1].providerId === 'password'){
            Swal.fire({ 
                title: 'Enter your password to delete your account',
                input: 'password',
                inputAttributes: {
                  autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                preConfirm: async (password) => {
                    return firebase.auth().signInWithEmailAndPassword(currentUser.email, password).catch((err) => {
                        Swal.showValidationMessage(err)
                    })
                }
            }).then((result) => {
                if(result.isConfirmed){
                    usersRef.doc(userInfo.docId).delete().then(() => {
                        currentUser.delete().catch((err) => {
                            Swal.fire('An error has occurred deleting your account, try again later', '', 'error');
                            console.log(err);
                        })
                    }).catch((err) => {
                        Swal.fire('An error has occurred deleting your account, try again later', '', 'error');
                        console.log(err);
                    })
                }
            })
        } else {
            firebase.auth().signInWithPopup(googleAuthProvider).then((result) => {
                currentUser.reauthenticateWithCredential(result.credential).then(() => {
                    usersRef.doc(userInfo.docId).delete().then(() => {
                        currentUser.delete().catch((err) => {
                            Swal.fire('An error has occurred deleting your account, try again later', '', 'error');
                            console.log(err);
                        })
                    }).catch((err) => {
                        Swal.fire('An error has occurred deleting your account, try again later', '', 'error');
                        console.log(err);
                    })
                }).catch((err) => {
                    Swal.fire(err.message, '', 'error');
                })
            })
        }
    }

    return (
        <div className='mt-5'>

            <h2 className='montserrat-font'>
                Delete account&nbsp;
            </h2>

            <small className='text-muted' style={{fontSize: '20px'}}>
                (Once you delete your account, there is no going back. Please be certain.)
            </small>

            <hr />

            <button onClick={handleDelete} className='btn btn-danger inter-font' style={{transition: 'all 270ms'}}>
                Delete your account
            </button>
            
        </div>
    )
}

export default DeleteAccount;