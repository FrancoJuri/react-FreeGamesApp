import React from 'react';
import { Link } from 'react-router-dom';
import GameCard from './GameCard';

const FavoritesCardsDiv = ({content, cardsLoading, handleRemove}) => {

    if(cardsLoading){
        return (
            <div style={{display: 'grid', placeContent: 'center', height: '430px', width: '100%'}}>
                <div className='spinner-grow text-primary' style={{width: '80px', height: '80px'}} role='status'>
                    <span className='visually-hidden'>Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className='d-flex justify-content-center mt-3 flex-wrap gap-5 container mb-4'>
            {
                (content.length >= 1)
                &&
                content.map(game => (
                    <GameCard key={game.id} title={game.title} image={game.thumbnail} id={game.id} genre={game.genre} desc={game.shortDescription} removeButton={true} handleRemove={handleRemove} />
                ))
            }

            {
                (!content.length)
                &&
                <div className='d-flex flex-column align-items-center justify-content-center mt-4 fadeIn'>
                    <div className='alert alert-info text-center' style={{fontSize: '22px'}}>
                        You don't have any favorite games
                    </div>
                    <Link to='/all' className='btn btn-primary quicksand-font' style={{fontSize: '20px'}}>Search Games</Link>
                </div>
            } 

        </div>
    )
}

export default FavoritesCardsDiv;
