import React from 'react';
import defaultUserImg from '../assets/defaultuserimg.png';
import PropTypes from 'prop-types';
import UserButton from './UserButton';

const UserCardHeader = ({ userInfo, loggedUser, isFollowing, isCurrentUserFollowing, setIsCurrentUserFollowing, buttonLoading, setButtonLoading, followersData, setFollowersData, setQuantityFollowers, setModalLoading }) => {
    return (
        <div className='w-100 d-flex flex-md-row flex-column gap-3 justify-content-between align-items-center p-md-0 p-2 my-2'>

            <div className='d-flex flex-md-row flex-column gap-md-4 gap-3 align-items-center justify-content-center'>
                <img 
                    className='profile-photo pointer' 
                    src={(userInfo.current[0].photoURL) ? userInfo.current[0].photoURL : defaultUserImg} 
                    alt='Profile' 
                    data-bs-toggle='modal' 
                    data-bs-target='#imagemodal'
                    onClick={(e) => {
                        document.querySelector('#modal-image').src = e.target.src;
                    }}
                />
                <h1 className={`${(isFollowing) && `d-flex flex-md-row flex-column align-items-center gap-2`} montserrat-font text-md-start text-center mb-0`} style={{wordBreak: 'break-word'}}>
                    {userInfo.current[0].name}
                    {
                        (isFollowing)
                        &&
                        <span className='badge bg-secondary montserrat-font p-2' style={{fontSize: '15px'}}>Follows you</span>
                    }
                </h1>
            </div>
            
            <UserButton 
                userInfo={userInfo} 
                loggedUser={loggedUser} 
                isCurrentUserFollowing={isCurrentUserFollowing}
                setIsCurrentUserFollowing={setIsCurrentUserFollowing}
                buttonLoading={buttonLoading}
                setButtonLoading={setButtonLoading}
                followersData={followersData}
                setFollowersData={setFollowersData}
                setQuantityFollowers={setQuantityFollowers}
                setModalLoading={setModalLoading}
            />

        </div>
    )
}

UserCardHeader.propTypes = {
    userInfo: PropTypes.object.isRequired,
}

export default UserCardHeader;
