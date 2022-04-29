import React from 'react';
import { Link } from 'react-router-dom';
import GameCard from './GameCard';

const HomeCardsSection = ({ data }) => {
    return(
        <>
            <div className='d-flex justify-content-center mt-3 flex-wrap gap-5 container mb-4 mt-5'>
                {
                    data.slice(0, 3).map(game => (
                        <GameCard 
                            key={game.id} 
                            title={game.title} 
                            image={game.thumbnail} 
                            id={game.id} 
                            genre={game.genre} 
                            desc={game.short_description} 
                        />
                    ))
                }
            </div>

            <div className='d-flex justify-content-center align-items-center'>
                <Link to='/all' className='btn btn-primary inter-font mt-4 p-3'>
                    <h4 className='mb-0'>
                        More Games
                    </h4>
                </Link>
            </div>
        </>
    )
}

export default HomeCardsSection;
