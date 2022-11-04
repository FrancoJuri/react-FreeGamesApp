import React from 'react';
import { exitToApp } from '../assets/svgs';
import { handleReturn } from '../helpers/handleReturn';
import AddToFavoritesButton from './AddToFavoritesButton'

const EndButtons = ({history, gameUrl, content, userDocRef, added, setAdded, favoriteLoading, setFavoriteLoading, favoriteError, setFavoriteError}) => {
    return (
        <div className='d-flex flex-row gap-sm-4 mt-5 gap-3 flex-wrap'>
            <button className='btn btn-outline-info' onClick={() => { handleReturn(history) }}>Return</button>
            <a href={gameUrl} target='_blank' rel='noreferrer' className='btn btn-primary quicksand-font'>
                Play Now {exitToApp}
            </a>
            <AddToFavoritesButton 
                content={content} 
                userDocRef={userDocRef} 
                normalButton={true} 
                added={added} 
                setAdded={setAdded} 
                favoriteLoading={favoriteLoading}
                setFavoriteLoading={setFavoriteLoading}
                favoriteError={favoriteError}
                setFavoriteError={setFavoriteError}
            />
        </div>
    )
}

export default EndButtons
