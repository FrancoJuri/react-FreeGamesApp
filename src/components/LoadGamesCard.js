import React from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import GameCard from './GameCard';
import Footer from './ui/Footer';
import Spinner from './ui/Spinner';
import PropTypes from 'prop-types';


const LoadGamesCard = ({url, category}) => {
    
    let content;
    const cors = 'https://cors-anywhere.herokuapp.com/';
    
    const {data, loading, error} = useFetch(`${cors}${url}`);

    if(!loading){
        content = data;
    }

    if(loading){
        return (
            <Spinner /> 
        )
    }

    if(error || data?.status === 0){
        return (
            <div className='alert alert-danger rounded text-center'>
                <h3 className='quicksand-font'>An error has ocurred, games could not be loaded, try again later</h3>
            </div>
        )
    }
    
    return (
        <>
            <div className='d-flex justify-content-center mt-5 flex-wrap gap-5 container mb-4'>

                {
                    content.map(game => (
                        <GameCard key={game.id} title={game.title} image={game.thumbnail} id={game.id} genre={game.genre} desc={game.short_description} />
                    ))
                }

                {
                    (!content.length)
                    &&
                    <div className='d-flex flex-column align-items-center justify-content-center'>
                        <div className='alert alert-info'>
                            No results found
                        </div>
                        <Link to='/home' className='btn btn-primary'>Back to home</Link>
                    </div>
                }


            </div>
        
        
            <div className='w-100 d-flex justify-content-center'>
                <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal">{category ? 'All categories' : 'Categories'}</button>
            </div>
            <hr className='mt-3' /> 
            <Footer /> 
        </>
    )
}

LoadGamesCard.propTypes = {
    url: PropTypes.string.isRequired,
}

export default LoadGamesCard;
