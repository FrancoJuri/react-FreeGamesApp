import React from 'react';
import { Link } from 'react-router-dom';
import defaultuserimg from '../assets/defaultuserimg.png';
import { firebase } from '../firebase/firebase-config';

const UserCard = ({ uid, photoURL, name, following, bio }) => {

    const currentUser = firebase.auth().currentUser;

    return (
        <div className='user-card d-flex flex-column align-items-center justify-content-center bg-dark gap-3 h-100'>
            
            <Link to={`/user/${uid}`}>
                <img src={ (photoURL) ? photoURL : defaultuserimg } alt='profile' />
            </Link>
            <h5 className='card-title poppins-font mb-0'>{ name }</h5>
            {
                (following.some(el => el.uid ===  currentUser.uid))
                &&
                <span className='badge bg-secondary montserrat-font p-2' style={{fontSize: '15px'}}>Follows you</span>
            }
            {
                (bio)
                &&
                <p className='card-text inter-font mb-0'>
                    {
                        bio?.substring(0, 42)
                    }
                    {
                        (bio?.length > 42) && '...'
                    }
                </p>
            }

            <Link to={`/user/${uid}`} className='btn btn-primary inter-font'>
                See profile
            </Link>
        </div>
    )
}

export default UserCard;