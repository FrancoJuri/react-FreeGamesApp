import React from 'react';
import NoReviewIcon from './NoReviewIcon';

const NoReviewData = ({gameTitle}) => {
    return (
        <div className='no-review mt-4 d-flex flex-column col-lg-6 col-12 mx-auto justify-content-center align-items-center fadeIn'>
            <NoReviewIcon />
            <p className='quicksand-font mt-3'>
                There are no reviews for {gameTitle}, be the first to post your review right now!
            </p>
        </div>
    )
}

export default NoReviewData;
