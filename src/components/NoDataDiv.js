import React from 'react';
import NoDataIcon from './NoDataIcon';

const NoDataDiv = ({type}) => {

    let component;
    if(type === 'Likes'){
        component = 'No one has Liked';
    } else if(type === 'Dislikes'){
        component = 'No one has marked as dislike';
    } else if(type === 'Followers'){
        component = 'This user has no followers';
    } else if(type === 'Following'){
        component = "This user doesn't follow anyone";
    }

    return (
        <div className='no-data-div mt-3 p-3'>
            <NoDataIcon />
            <p className='mt-4 text-center'>{component}</p>
        </div>
    )
}

export default NoDataDiv;
