import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import validator from 'validator';
import { context } from '../../createContext';
import useForm from '../../hooks/useForm';
import { types } from '../../types/types';
import { firebase, googleAuthProvider } from '../../firebase/firebase-config';
import Footer from '../ui/Footer';

const MySwal = withReactContent(Swal);

const LoginScreen = () => {
    
    const [formValues, handleInputChange] = useForm({
        email: '',
        password: '',
    })

    const {email, password} = formValues;

    const { dispatchAuth, dispatchUi, stateUi } = useContext(context);
    const { loading, msgError } = stateUi;
    

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isFormValid()){
            dispatchUi({
                type: types.uiStartLoading,
            })
            firebase.auth().signInWithEmailAndPassword(email, password) 
            .then(({user}) => {
                dispatchAuth({
                    type: types.login,
                    payload: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    }
                })
            })
            .catch(err => {
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

    const handleGoogleLogin = () => {
        if(stateUi.loading) return;
        dispatchUi({
            type: types.uiStartLoading,
        })
        firebase.auth().signInWithPopup(googleAuthProvider).finally(() => {
            dispatchUi({
                type: types.uiFinishLoading,
            })
        }).catch((err) => {
            if(err.code !== 'auth/popup-closed-by-user'){
                Swal.fire('An error has occurred signing in, try again later', '', 'error');
            }
        })
    }

    const isFormValid = () => {

        if(!validator.isEmail(email)){
            dispatchUi({
                type: types.uiSetError,
                payload: 'Email is not valid'
            })
            return false;
        } else if(password.trim() === ''){
            dispatchUi({
                type: types.uiSetError,
                payload: 'Password is not valid'
            })
            return false;
        }
        
        dispatchUi({
            type: types.uiUnSetError,
        })

        return true;

    }

    useEffect(() => {
        dispatchUi({
            type: types.uiFinishLoading,
        })
    }, [dispatchUi])

    useEffect(() => {
        if(msgError){
            MySwal.fire(
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

                    <h2 className='text-center montserrat-font'>Login on Free Games</h2>

                    <div className='mb-3 mt-4 inter-font'>
                        <label className='form-label'>Email address</label>
                        <input type='email' className='form-control' name='email' autoComplete='off' placeholder='email@email.com' value={email} onChange={handleInputChange} />
                        <div id='emailHelp' className='form-text'>We'll never share your email with anyone else.</div>
                    </div>

                    <div className='inter-font'>
                        <label className='form-label'>Password</label>
                        <input type='password' className='form-control' name='password' value={password} onChange={handleInputChange} />

                    </div>


                    <div className='social-networks mb-3'>

                        <div 
                            className='google-btn'
                            onClick={handleGoogleLogin}
                        >
                            <div className='google-icon-wrapper'>
                                <img className='google-icon' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' alt='google button' />
                            </div>
                            <p className='btn-text inter-font'>
                                <b>Sign in with google</b>
                            </p>
                        </div>

                    </div>

                    {
                        (!loading)
                        ?
                        <button type='submit' className='btn btn-primary w-100'>Login</button>
                        :
                        <button className='btn btn-primary w-100' type='button' disabled>
                            <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'></span>
                            <span className='visually-hidden'>Loading...</span>
                        </button>
                    }

                    <div className='d-flex flex-column'>
                        <Link to='/auth/register' className='link mt-3 inter-font'>
                            don't you have an account?
                        </Link> 

                        <Link to='/auth/forgot-password' className='link mt-3 inter-font'>
                            forgot password?
                        </Link> 
                    </div>
                    
                </form>
            </div>
            <Footer />
        </>
    )
}

export default LoginScreen;
