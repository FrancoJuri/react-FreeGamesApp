import React from 'react';
import UserInfoDiv from './UserInfoDiv';
import NoDataDiv from './NoDataDiv';

const RatingModal = ({ type, likeData, dislikeData, followersData, followingData, modalLoading }) => {

    const handleLink = () => {
        document.getElementById('ratingModalClose').click();
        window.scrollTo(0, 0);
    }

    let component;
    if(modalLoading){
        component = <div style={{ height: '400px', display: 'grid', placeContent: 'center' }}>
                        <div className='spinner-grow' style={{width: '4rem', height: '4rem'}} role='status'>
                            <span className='visually-hidden'>Loading...</span>
                        </div>
                    </div>
    } else if(type === 'Likes' && likeData.length === 0){
        component = <NoDataDiv type={type} />
    } else if(type === 'Dislikes' && dislikeData.length === 0){
        component = <NoDataDiv type={type} />
    } else if(type === 'Likes' && likeData.length){
        component = likeData.map(el => (
            <UserInfoDiv handleLink={handleLink} key={el.uid} el={el} />
        ))
    } else if(type === 'Dislikes' && dislikeData.length){
        component = dislikeData.map(el => (
            <UserInfoDiv handleLink={handleLink} key={el.uid} el={el} />
        ))
    } else if(type === 'Followers' && followersData.length === 0){
        component = <NoDataDiv type={type} />
    } else if(type === 'Following' && followingData.length === 0){
        component = <NoDataDiv type={type} />
    } else if(type === 'Followers' && followersData.length){
        component = followersData.map(el => (
            <UserInfoDiv handleLink={handleLink} key={el.uid} el={el} />
        ))
    } else if(type === 'Following' && followingData.length){
        component = followingData.map(el => (
            <UserInfoDiv handleLink={handleLink} key={el.uid} el={el} />
        ))
    }

    return (
        <div className='modal fade' data-bs-backdrop="static" data-bs-keyboard="false" id='ratingModal' tabIndex='-1' aria-labelledby='ratingModalLabel' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content bg-dark' style={{minHeight: '500px', maxHeight: '80vh'}}>
                    <div className='modal-header'>
                        <h4 className='modal-title montserrat-font' id='ratingModalLabel'>
                            {type}
                        </h4>
                        <button onClick={() => {
                            document.querySelector('nav').classList.add('sticky-top');
                        }} id='ratingModalClose' type='button' className='btn-close btn-close-white' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body' style={{padding: '0'}}>
                        {component}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RatingModal;
