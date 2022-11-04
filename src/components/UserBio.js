import React from 'react';
import PropTypes from 'prop-types';
import NoBiographyIcon from './NoBiographyIcon';

const UserBio = ({userInfo}) => {

    let component;

    if(userInfo.current[0].bio !== null && userInfo.current[0].bio !== ''){
        component = <p className='quicksand-font' style={{fontSize: '20px'}}> {userInfo.current[0].bio} </p>
    } else {
        component = 
        <div className='no-biography-div d-flex flex-column flex-wrap justify-content-center align-items-center'>
            <NoBiographyIcon />
            <p className='quicksand-font text-center mt-4'>This user doesn't have a biography</p>
        </div>
    }


    return (component)
}

UserBio.propTypes = {
    userInfo: PropTypes.object.isRequired,
}

export default UserBio;
