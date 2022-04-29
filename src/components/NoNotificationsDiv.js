import React from 'react';
import NoNotificationsIcon from './NoNotificationsIcon';

const NoNotificationsDiv = () => {
    return (
        <div className='no-notifications-div d-flex flex-column gap-4 justify-content-center align-items-center p-4'>
            <NoNotificationsIcon />
            <p className='text-center'>You don't have any notifications at this moment</p>
        </div>
    )
}

export default NoNotificationsDiv;
