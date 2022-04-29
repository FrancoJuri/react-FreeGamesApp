import React from 'react';
import GameCard from './GameCard';

const HomeCategoryCardsSection = ({ categoryData }) => {
    return (
        <>
            <h2 className='text-center montserrat-font mt-5'>
                Mmorpg Games
            </h2>

            <div className='d-flex justify-content-center mt-3 flex-wrap gap-5 container mb-4 mt-5'>
                {
                    categoryData.slice(0, 3).map(game => (
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
                <button className='btn btn-primary inter-font mt-4 p-3'>
                    <h4 className='mb-0' data-bs-toggle='modal' data-bs-target='#exampleModal'>
                        All Categories
                    </h4>
                </button>
            </div>
        </>
    )
}

export default HomeCategoryCardsSection;