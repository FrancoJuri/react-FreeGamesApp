import React from 'react';
import defaultuserimg from '../assets/defaultuserimg.png';

const DefaultUserImg = ({profileScreenPhoto}) => {
    return (
        <div className={`${!profileScreenPhoto ? 'user-photo d-flex me-2' : 'w-100 d-flex justify-content-center'} `}>
            <img className={`${profileScreenPhoto && 'profile-photo'}`} src={`${defaultuserimg}`} alt='Profile' />
        </div>
    )
}

export default DefaultUserImg;
