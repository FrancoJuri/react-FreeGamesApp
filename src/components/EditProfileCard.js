import React, { useEffect, useState } from 'react';
import { firebase, usersRef } from '../firebase/firebase-config';
import defaultUserImg from '../assets/defaultuserimg.png'
import useForm from '../hooks/useForm';
import Swal from 'sweetalert2';

const EditProfileCard = ({ userInfo }) => {

    const currentUser = firebase.auth().currentUser;

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
    })
        

    const initialProfileCardInfo = {
        photoURL: userInfo.photoURL,
        name: userInfo.name,
        bio: userInfo.bio,
    }

    const [profileCardInfo, setProfileCardInfo] = useState(initialProfileCardInfo);
    const [photoSrc, setPhotoSrc] = useState(userInfo.photoURL || defaultUserImg);
    const [disabled, setDisabled] = useState(false);

    const [formValues, handleInputChange] = useForm({
        name: userInfo.name,
        bio: `${(userInfo.bio) ? userInfo.bio : ''}`,
    })

    const { name, bio } = formValues;

    const handleSubmit = async () => {

        try {

            const obj1 = JSON.stringify(profileCardInfo);
            const obj2 = JSON.stringify(initialProfileCardInfo);
            
            if(obj1 === obj2){
                return;
            }

            setDisabled(true);

            Toast.fire({
                icon: 'success',
                title: 'Your profile is being edited'
            })

            if(profileCardInfo.bio !== initialProfileCardInfo.bio){
                await usersRef.doc(userInfo.docId).update({
                    bio: profileCardInfo.bio,
                }).catch(() => {
                    Swal.fire('An error has occurred changing your biography, try again later', '', 'error');
                })
            }
            
            if(profileCardInfo.name !== initialProfileCardInfo.name){
                await usersRef.doc(userInfo.docId).update({
                    name: profileCardInfo.name,
                }).then(() => {
                    currentUser.updateProfile({
                        displayName: profileCardInfo.name,
                    })
                }).catch(() => {
                    Swal.fire('An error has occurred changing your name, try again later', '', 'error');
                })
            }
            
            if(profileCardInfo.photoURL !== initialProfileCardInfo.photoURL){
                await usersRef.doc(userInfo.docId).update({
                    photoURL: profileCardInfo.photoURL,
                }).catch(() => {
                    Swal.fire('An error has occurred changing your profile picture, try again later', '', 'error');
                })
            }

            window.location.reload();
            
        } catch (error) {
            console.log(error);
            Swal.fire('An error has occurred editing your profile, try again later', '', 'error');
            setDisabled(false);
        }

    }

    const handleRemovePhoto = async () => {
        Swal.fire({
            title: 'Are you sure to remove your profile picture?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove', 
        }).then( async (result) => {
            if(result.isConfirmed){
                try {

                    setDisabled(true);

                    Toast.fire({
                        icon: 'success',
                        title: 'Your profile picture is being removed'
                    })

                    await usersRef.doc(userInfo.docId).update({
                        photoURL: null,
                    })
        
                    await currentUser.updateProfile({
                        photoURL: null,
                    })

                    window.location.reload();

                } catch (error) {
                    console.log(error);
                    Swal.fire('An error has occurred removing your profile picture, try again later', '', 'error');
                    setDisabled(false);
                }
            }
        })
    }

    const readFile = (el) => {
        const reader = new FileReader();
        reader.readAsDataURL(el);
        reader.addEventListener('load', (e) => {
            setPhotoSrc(e.currentTarget.result);
            setProfileCardInfo(c => {
                return {...c, photoURL: e.currentTarget.result}
            })
        })
    }

    useEffect(() => {
        setProfileCardInfo(c => {
            return {...c, name: name.trim()}
        })
    }, [name])

    useEffect(() => {
        setProfileCardInfo(c => {
            return {...c, bio: bio.trim()}
        })
    }, [bio])

    return (
        <div className='card text-white bg-dark'> 

            <div className='card-header p-3'>
                <h1 className='text-center montserrat-font mb-0'>Edit profile</h1>
            </div>

            <ul className='list-group list-group-flush'>

                <div className='list-group-item bg-dark d-flex flex-column justify-content-center align-items-center gap-3 p-3'>
                    <img 
                        className='profile-photo' 
                        src={ photoSrc } 
                        alt='Profile' 
                    />
                    
                    <form onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <label className='change-link poppins-font text-center' htmlFor='change-profile-picture'>
                            Change profile picture
                        </label>
                        <input id='change-profile-picture' type='file' accept='image/png, image/jpeg' onChange={(e) => {
                            readFile(e.target.files[0]);
                        }} />
                    </form>

                    {
                        (userInfo.photoURL)
                        &&
                        <button onClick={handleRemovePhoto} className='btn btn-danger quicksand-font' style={{transition: 'all 270ms'}}>
                            Remove profile picture
                        </button>
                    }
                </div>

                <div className='list-group-item bg-dark p-3 d-flex justify-content-center align-items-center'>
                    <form className='form-floating w-75' onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <input 
                            type='text' 
                            className='form-control bg-dark text-white inter-font' 
                            id='floatingInputValue' 
                            autoComplete='off'
                            name='name'
                            value={name}
                            onChange={handleInputChange}
                            maxLength='30'
                        />
                        <label className='pb-5' style={{color: 'rgb(191, 203, 212)'}} htmlFor='floatingInputValue'>Name</label>
                    </form>
                </div>

                <div className='list-group-item bg-dark d-flex justify-content-center align-items-center p-3'>
                    <form className='form-floating w-75' onSubmit={(e) => {
                        e.preventDefault();
                    }}>
                        <textarea 
                            type='text' 
                            className='form-control bg-dark text-white inter-font' 
                            id='floatingInputValue' 
                            autoComplete='off'
                            name='bio'
                            value={bio}
                            onChange={handleInputChange}
                            maxLength='190'
                        />
                        <label 
                            className='pb-5' 
                            style={{color: 'rgb(191, 203, 212)'}} 
                            htmlFor='floatingInputValue'>
                            Bio
                        </label>
                    </form>
                </div>

            </ul>

            <div className='card-footer d-flex justify-content-center align-items-center p-3'>
                <button 
                    className={`${(disabled) && 'disabled'} save-changes px-4 py-2`} 
                    onClick={handleSubmit} 
                    disabled={disabled ? true : false}
                >
                    Save changes
                </button>
            </div>

        </div>
    )
}

export default EditProfileCard;
