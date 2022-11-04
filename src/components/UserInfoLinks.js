import React from 'react';
import { thumbDown, svgFavorite } from '../assets/svgs';
import { likeIcon } from '../assets/svgs';
import { Link } from 'react-router-dom';

const UserInfoLinks = ({userInfo, loggedUser, activeSection, history}) => {
    return (
        <div className='user-info-links d-flex justify-content-evenly align-items-center fadeIn'>
                
            <div onClick={() => {
                history.push('?tab=')
            }} className={`${(activeSection === 'Likes') && 'user-info-active'} d-flex justify-content-center align-items-center gap-2 pointer`}>
                {likeIcon}
                <span className='montserrat-font'>Likes</span>
            </div>

            <div onClick={() => {
                history.push('?tab=Dislikes')
            }} className={`${(activeSection === 'Dislikes') && 'user-info-active'} d-flex justify-content-center align-items-center gap-2 pointer`}>
                {thumbDown}
                <span className='montserrat-font'>Dislikes</span>
            </div>

            {
                (userInfo.current[0].uid === loggedUser.current[0].uid)
                &&
                <Link to='/favorites' className='d-flex justify-content-center align-items-center gap-2 pointer'>
                    {svgFavorite}
                    <span className='montserrat-font'>Favorites</span>
                </Link>
            }
                 
        </div>
    )
}

export default UserInfoLinks;
