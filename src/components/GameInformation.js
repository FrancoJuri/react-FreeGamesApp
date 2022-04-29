import React from 'react';
import { thumbDown, thumbUp, neutral } from '../assets/svgs';

const GameInformation = ({quantityLikes, quantityDislikes, content}) => {
    return (
        <ul className='list-group mb-4 mt-4 rounded'>
            <li className='list-group-item list-group-item-dark'><strong>Genre: </strong>{content.genre}</li>
            <li className='list-group-item list-group-item-dark'><strong>Platform: </strong>{content.platform}</li>
            {
                (content.publisher === content.developer)
                ?
                <li className='list-group-item list-group-item-dark'><strong>Publisher and developer: </strong>{content.publisher}</li>
                :
                <>
                    <li className='list-group-item list-group-item
                    list-group-item-dark'><strong>Publisher: </strong>{content.publisher}</li>
                    <li className='list-group-item list-group-item
                    list-group-item-dark'><strong>Developer: </strong>{content.developer}</li>
                </>
            }
            <li className='list-group-item list-group-item-dark'><strong>Release date: </strong>{content.release_date}</li>
            <li className='list-group-item list-group-item-dark'><strong>Game Rating: </strong> 
                {
                    (quantityLikes > quantityDislikes)
                    &&
                    <>
                        {thumbUp}
                        &nbsp;Positive
                    </>
                }  
                
                {
                    (quantityDislikes === quantityLikes && quantityLikes !== null && quantityDislikes !== null)
                    &&
                    <>
                        {neutral}
                        &nbsp;Neutral
                    </>
                }

                {
                    (quantityLikes === null || quantityDislikes === null)
                    &&
                    "Loading..."
                }

                {
                    (quantityDislikes > quantityLikes)
                    &&
                    <>
                        {thumbDown}
                        &nbsp;Negative
                    </>
                }
            </li>
        </ul>
    )
}

export default GameInformation
