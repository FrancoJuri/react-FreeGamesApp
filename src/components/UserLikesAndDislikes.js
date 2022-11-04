import React from 'react';
import GameCard from './GameCard';

const UserLikesAndDislikes = ({activeSection, userInfo}) => {
    return (
        <>
            {
                (activeSection === 'Likes')
                ?
                <div>
                    {
                        (userInfo.current[0].likes.length >= 1)
                        ?
                        <div className='d-flex justify-content-center flex-wrap gap-5 container mb-5 mt-5'>
                            {
                                userInfo.current[0].likes.map(game => (
                                    <GameCard 
                                        key={game.id} 
                                        title={game.title} 
                                        image={game.thumbnail} 
                                        id={Number(game.id)} 
                                        genre={game.genre} 
                                        desc={game.shortDescription} 
                                    />
                                ))
                            }
                        </div>
                        :
                        <div className='alert alert-danger text-center mx-auto mt-3 fadeIn' style={{fontSize: '25px'}}>
                            This user has no likes
                        </div>
                    }
                </div>
                : 
                <div>
                    {
                        (userInfo.current[0].dislikes.length >= 1)
                        ?
                        <div className='d-flex justify-content-center flex-wrap gap-5 container mb-5 mt-5'>
                            {
                                userInfo.current[0].dislikes.map(game => (
                                    <GameCard 
                                        key={game.id} 
                                        title={game.title} 
                                        image={game.thumbnail} 
                                        id={Number(game.id)} 
                                        genre={game.genre} 
                                        desc={game.shortDescription} 
                                    />
                                ))
                            }
                        </div>
                        :
                        <div className='alert alert-danger text-center mx-auto mt-3 fadeIn' style={{fontSize: '25px'}}>
                            This user has no dislikes
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default UserLikesAndDislikes;
