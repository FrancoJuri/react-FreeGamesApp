import React from 'react';
import PropTypes from 'prop-types';

const FollowSection = ({quantityFollowers, quantityFollowing, setRatingSelected}) => {
    return (
        <div className='d-flex flex-wrap justify-content-center align-items-center quicksand-font'>
            <div 
                className='link pointer' 
                data-bs-toggle='modal' 
                data-bs-target='#ratingModal'
                onClick={() => {
                    setRatingSelected('Followers');
                    if(document.querySelector('.modal-backdrop')){
                        document.querySelector('.modal-backdrop').remove();
                    }
                }}
            >
                <strong>{quantityFollowers}</strong> Followers 
            </div> 

            <span className='text-white'>&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;</span>

            <div 
                className='link pointer' 
                data-bs-toggle='modal' 
                data-bs-target='#ratingModal'
                onClick={() => {
                    setRatingSelected('Following');
                    if(document.querySelector('.modal-backdrop')){
                        document.querySelector('.modal-backdrop').remove();
                    }
                }}
            >
                <strong>{quantityFollowing}</strong> Following
            </div>
        </div>
    )
}

FollowSection.propTypes = {
    quantityFollowers: PropTypes.number.isRequired,
    quantityFollowing: PropTypes.number.isRequired,
}

export default FollowSection;
