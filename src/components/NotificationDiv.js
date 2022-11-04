import React from 'react';
import { Link } from 'react-router-dom';
import defaultUserImg from '../assets/defaultuserimg.png';
import { firebase } from '../firebase/firebase-config';
import moment from 'moment';

const NotificationDiv = ({el}) => {

    const currentUser = firebase.auth().currentUser;

    const date = el.following.filter(el => el.uid === currentUser.uid)[0].date;

    const timeAgo = moment(date).fromNow();

    return (
        <Link to={`/user/${el.uid}`} className='notification-div w-100 d-flex justify-content-between align-items-center px-4'>

            <div className='d-flex justify-content-center align-items-center gap-3'>
                <img className='user-info-div-img pointer' src={(el.photoURL) ? el.photoURL : defaultUserImg} alt='user' />
                <p className='mb-0 inter-font notification-text'>
                    <span className='poppins-font link'>
                        {el.name.trim().substring(0, 14)}{(el.name.trim().length > 14 && "...")}
                    </span> started following you. &nbsp;
                    <span className='text-muted'>
                        {timeAgo}
                    </span>
                </p>
            </div>

            <div>
                
            </div>
        </Link>
    )
}

export default NotificationDiv;
