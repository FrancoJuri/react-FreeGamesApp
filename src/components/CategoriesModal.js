import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesModal = () => {

    const categories = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'];

    const handleLink = () => {
        document.querySelector('.btn-close').click();
        window.scrollTo(0, 0);
    }

    return (
        <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
            <div className='modal-dialog modal-fullscreen'>
                <div className='modal-content bg-dark'>
                    <div className='modal-header'>
                        <h2 className='modal-title mx-auto montserrat-font' id='exampleModalLabel'>All categories</h2>
                        <button type='button' className='btn-close btn-close-white' data-bs-dismiss='modal' aria-label='Close' style={{margin: '0 !important'}}></button>
                    </div> 
                    <div className='modal-body'>
                        <div className='list-group'>
                            {
                                categories.map(category => (
                                    <Link to={`/category/${category}`} key={category} className='list-group-item list-group-item-action inter-font' onClick={handleLink}>{category}</Link>
                                ))
                            }
                        </div>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                    </div>
                </div>
            </div>
        </div> 
    )
}

export default CategoriesModal
