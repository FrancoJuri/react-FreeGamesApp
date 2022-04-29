import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { context } from '../../createContext';
import useForm from '../../hooks/useForm';
import { types } from '../../types/types';
import validator from 'validator';
import { firebase, usersRef } from '../../firebase/firebase-config';
import Swal from 'sweetalert2';
import Footer from '../ui/Footer';

const RegisterScreen = () => {

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '',
    }) 

    const {name, email, password, password2} = formValues;

    const {dispatchAuth, dispatchUi, stateUi} = useContext(context);
    const {msgError, loading} = stateUi; 

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isFormValid()){
            dispatchUi({
                type: types.uiStartLoading,
            })
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({user}) => {
                await user.updateProfile({displayName: name});

                const userObject = {
                    bio: null,
                    name: user.displayName,
                    uid: user.uid,
                    favorites: [],
                    dislikes: [],
                    likes: [],
                    followers: [],
                    following: [],
                    reviews: [],
                    photoURL: user.photoURL,
                }

                usersRef.add(userObject)
                    .catch(() => {
                        Swal.fire(
                            'Error',
                            'Account could not be created, try again later',
                            'error',
                        )
                    });
                
                dispatchAuth({
                    type: types.login,
                    payload: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    }
                }) 

            }).catch(err => {
                Swal.fire(
                    'Error',
                    err.message,
                    'error',
                )
            }).finally(() => {
                dispatchUi({
                    type: types.uiFinishLoading,
                })
            })
        }
    }

    const isFormValid = () => {

        if(name.trim().length === 0){
            dispatchUi({
                type: types.uiSetError,
                payload: 'Name is required'
            })
            return false;
        } else if(name.trim().length < 6){
            dispatchUi({
                type: types.uiSetError,
                payload: 'Name should contain at least 6 characters',
            })
            return false;
        } else if(!validator.isEmail(email)){
            dispatchUi({
                type: types.uiSetError,
                payload: 'Email is not valid'
            })
            return false;
        } else if(!validator.equals(password.trim(), password2.trim()) || password.length < 8){
            dispatchUi({
                type: types.uiSetError,
                payload: 'Password should be at least 8 characters and match each other',
            });
            return false;
        }

        dispatchUi({
            type: types.uiUnSetError,
        });

        return true;

    }

    useEffect(() => {
        if(msgError){
            Swal.fire(
                'Error',
                msgError,
                'error'
            )
        }
        return () => {
            dispatchUi({
                type: types.uiUnSetError,
            })
        }
    }, [msgError, dispatchUi]); 


    return (
        <>
        <div className='form-container p-2'>
            <form className='p-4 p-md-5 bg-dark border rounded' onSubmit={handleSubmit}>
                
                <h2 className='text-center montserrat-font'>Register on Free Games</h2>

                <div className='mb-3 mt-4 inter-font'>
                    <label className='form-label'>Name</label>
                    <input type='text' className='form-control' autoComplete='off' placeholder='E.g. Franco Juri' name='name' value={name} onChange={handleInputChange} />
                </div>

                <div className='mb-3 mt-4 inter-font'>
                    <label className='form-label'>Email address</label>
                    <input type='email' className='form-control' placeholder='email@email.com' name='email' autoComplete='off' value={email} onChange={handleInputChange} />
                    <div id='emailHelp' className='form-text'>We'll never share your email with anyone else.</div>
                </div>

                <div className='mb-3 inter-font'>
                    <label className='form-label'>Password</label>
                    <input type='password' className='form-control' name='password' value={password} onChange={handleInputChange} />
                </div>
                    
                <div className='inter-font'>
                    <label className='form-label'>Confirm password</label>
                    <input type='password' className='form-control' name='password2' value={password2} onChange={handleInputChange} />
                </div>

                {
                    (!loading)
                    ?
                    <button type='submit' className='btn btn-primary w-100 mt-3 inter-font'>Create account</button>
                    :
                    <button className='btn btn-primary w-100 mt-3' type='button' disabled>
                        <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'></span>
                        <span className='visually-hidden'>Loading...</span>
                    </button>
                }

                <Link to='/auth/login' className='link mt-3 inter-font'>
                    Already register?
                </Link> 
            </form> 
        </div>
        <Footer />
        </>
    )
}

export default RegisterScreen;
