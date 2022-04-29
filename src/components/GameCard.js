import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useNearScreen } from '../hooks/useNearScreen';

const GameCard = ({title, image, desc, id, genre, removeButton, handleRemove}) => {

    const [isNear, fromRef] = useNearScreen();
    
    return (
        <div style={{
            display: 'block',
            height: '100%',
            width: '20rem',
        }} ref={fromRef}>
            {
                (isNear)
                &&
                <div className='card game-card bg-dark text-white rounded h-100' style={{maxWidth: '20rem'}}>
                    <Link to={`/game/${id}`}>
                        <img loading='lazy' src={image} alt={title} className='img-top img-fluid pointer' />
                    </Link>
                    <div className='card-body'>
                        <h5 className='card-title poppins-font'>{title}</h5>
                        <p className='card-text inter-font'>{desc}</p>
                        <div className='d-flex flex-wrap justify-content-between'>
                            <Link to={`/game/${id}`} className='btn btn-primary inter-font'>More Details</Link>
                        </div>
                    </div>
                    <div className={`${(removeButton && 'favorite-card-footer d-flex justify-content-between align-items-center')} card-footer`}>
                        {
                            (removeButton)
                            ?
                            <>
                                <p className='text-muted genre-favorite-card inter-font' style={{marginBottom: '0px'}}><strong>Genre:</strong> { genre }</p>
                                
                                <button className='btn btn-danger quicksand-font remove-favorite-button' style={{transition: 'all 270ms'}} onClick={() => {
                                    handleRemove(title, id);
                                }}>Remove 
                                    <span className='pointer delete-svg' style={{marginTop: '7px'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                                    </span>
                                </button>
                            </>
                            :
                            <small className='text-muted inter-font'><strong>Genre:</strong> { genre }</small>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

GameCard.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    genre: PropTypes.string.isRequired,
}

export default GameCard;
