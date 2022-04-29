import React from 'react';
import { exitToApp } from '../assets/svgs';

const PlayNowButton = ({gameUrl}) => {
    return (
        <button className='play-now btn-primary fadeIn quicksand-font'>
            <a href={gameUrl} target='_blank' rel="noreferrer">
                Play Now {exitToApp}
            </a>
        </button>
    )
}

export default PlayNowButton;
