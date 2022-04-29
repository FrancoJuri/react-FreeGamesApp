import React, { useContext } from 'react';
import { context } from '../createContext';

const CategoryFilterCard = ({ filters, setFilters }) => {

    const { stateUi } = useContext(context);

    const categories = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps','anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'];

    return (
        <div className='card text-white bg-dark mb-3 category-card'> 

            <div className='card-header montserrat-font' style={{fontSize: '24px'}}>
                Category:
            </div>

            <div className='card-body d-flex flex-column gap-3 category-body-card'>

                {
                    categories.map((category, index) => (
                        <div className='form-check' key={index}>
                            <input 
                                className='form-check-input' 
                                type='checkbox' 
                                value='' 
                                id={`categoryCheckbox${index + 1}`} 
                                onChange={() => {
                                    if(filters.category.some(el => el === category)){
                                        const filteredArr = filters.category.filter(el => el !== category);
                                        setFilters({
                                            ...filters,
                                            category: filteredArr,
                                        })
                                    } else{
                                        setFilters({
                                            ...filters,
                                            category: [...filters.category, category],
                                        })
                                    }
                                }}
                                checked={(filters.category.some(el => el === category)) ? true : false}
                                disabled={stateUi.loading}
                            />
                            <label className='form-check-label' htmlFor={`categoryCheckbox${index + 1}`}>
                                {`${category[0].toUpperCase()}${category.substring(1)}`}
                            </label>
                        </div>
                    ))
                }

            </div>

        </div>
    )
}

export default CategoryFilterCard;
