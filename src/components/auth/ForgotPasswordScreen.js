import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import Footer from '../ui/Footer';
import { firebase } from '../../firebase/firebase-config';
import Swal from 'sweetalert2';

const ForgotPasswordScreen = () => {

    const [formValues, handleInputChange] = useForm({
        email: '',
    })

    const { email } = formValues;

    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        firebase.auth().sendPasswordResetEmail(email).then(() => {
            setSent(true);
        }).catch(err => {
            Swal.fire('An error has occurred sending the password reset instructions, try again later', '', 'error');
            console.log(err);
        })
    }

    return (
        <>
            <div className='form-container p-2'>

                <form className='p-4 p-md-5 bg-dark border rounded' style={{maxWidth: '500px'}} onSubmit={handleSubmit}>

                    <h2 className='text-center montserrat-font mb-0'>Reset Password</h2>

                    {
                        (!sent)
                        ?
                        <div className='d-flex justify-content-center align-items-center mt-2'>
                            <span className='inter-font text-center' style={{fontSize: '17px'}}>
                                Enter your email adress and we'll send you a link to reset your password
                            </span>
                        </div>
                        :
                        <div className='alert alert-success fadeIn inter-font mt-4'>
                            If this email exists then you should soon receive the instructions to reset your password.
                        </div>
                    }


                    {
                        (!sent)
                        ?
                        <>
                            <div className='mb-3 mt-4 inter-font'>
                                <label className='form-label'>Email address</label>
                                <input type='email' className='form-control' name='email' autoComplete='off' placeholder='email@email.com' value={email} onChange={handleInputChange} />
                            </div>
                    
                            <button type='submit' className='btn btn-primary w-100'>Send Instructions</button>

                            <Link to='/auth/login' className='link mt-3 inter-font'>
                                remembered password?
                            </Link> 
                        </>
                        :
                        <Link to='/auth/login' className='btn btn-primary w-100 inter-font fadeIn'>
                            Login
                        </Link>
                    }
                    
                </form>
            </div>
            <Footer />
        </>
    )
}

export default ForgotPasswordScreen;
