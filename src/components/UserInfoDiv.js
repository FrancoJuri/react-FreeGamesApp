import React from 'react';
import { Link } from 'react-router-dom';
import defaultuserimg from '../assets/defaultuserimg.png';
import { firebase } from '../firebase/firebase-config';

const UserInfoDiv = ({el, handleLink}) => {

    const currentUser = firebase.auth().currentUser;

    return (
        <Link to={`/user/${el.uid}`} onClick={handleLink} className='user-info-div gap-3 w-100 d-flex'>
            <div>
                {
                    (el.photoURL)
                    ?
                    <img className='pointer user-info-div-img' src={el.photoURL} alt='profile' />
                    :
                    <img className='pointer user-info-div-img' src={defaultuserimg} alt='profile' />
                }
            </div>

            <div className='d-flex flex-column gap-1'> 
                <span className='user-name-span montserrat-font d-flex flex-md-row flex-column justify-content-md-start justify-content-center align-items-md-center align-items-start gap-md-2 gap-1' style={{wordBreak: 'break-word'}}>
                    {el.name.trim().substring(0, 14)}{(el.name.trim().length > 14) && "..."} 
                    {
                        (el.following?.some(el => el.uid === currentUser.uid))
                        &&
                        <span className='badge bg-secondary montserrat-font p-2' style={{fontSize: '14px'}}>Follows you</span>
                    }
                </span>
                <small className='quicksand-font'>{el.followers.length} Followers</small>
                {
                    (el.bio)
                    &&
                    <p className='quicksand-font' style={{fontSize: '14.5px', wordBreak: 'break-all'}}>
                        {el.bio?.trim().substring(0, 60)}{(el.bio.trim().length > 57) && "..."}
                    </p>
                }
            </div>
        </Link>
    )
}

export default UserInfoDiv
