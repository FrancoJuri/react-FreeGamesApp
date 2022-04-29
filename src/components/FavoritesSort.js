import React, { useCallback, useEffect } from 'react';
import { sortIcon } from '../assets/svgs';

const FavoritesSort = ({sort, setSort, setCardsLoading, content}) => {

    const setAlphabeticalSort = useCallback(() => { 
        setCardsLoading(true);
        setTimeout(() => {
            content.sort((a, b) => {
                const titleA = a.title.toLowerCase();
                const titleB = b.title.toLowerCase();
    
                if(titleA < titleB){
                    return -1;
                }
    
                if(titleA > titleB){
                    return 1;
                }
    
                return 0;
            })
            setCardsLoading(false);
        }, 250);
    }, [content, setCardsLoading])

    const setFormerlyAddedSort = useCallback(() => {
        setCardsLoading(true);
        setTimeout(() => {
            content.sort((a, b) => {
                if(a.time < b.time){
                    return -1;
                }
    
                if(a.time > b.time){
                    return 1;
                }
    
                return 0;
            })
            setCardsLoading(false);
        }, 250);
    }, [content, setCardsLoading])

    const setRecentlyAddedSort = useCallback(() => {
        setCardsLoading(true);
        setTimeout(() => {
            content.sort((a, b) => {
                if(a.time < b.time){
                    return 1;
                }
    
                if(a.time > b.time){
                    return -1;
                }
    
                return 0;
            })
            setCardsLoading(false);
        }, 250)
    }, [content, setCardsLoading])

    const setReleaseDateSort = useCallback(() => {
        setCardsLoading(true);
        setTimeout(() => {
            content.sort((a, b) => {
                if(a.release_date < b.release_date){
                    return 1;
                }
                 
                if(a.release_date > b.release_date){
                    return -1;
                }

                return 0;
            });
            setCardsLoading(false);
        }, 250)
    }, [content, setCardsLoading])

    useEffect(() => {
        if(Array.isArray(content)){
            if(sort === 'Alphabetical'){
                setAlphabeticalSort();
                localStorage.setItem('favoritesSort', 'Alphabetical');
            } else if(sort === 'Formerly Added'){
                setFormerlyAddedSort();
                localStorage.setItem('favoritesSort', 'Formerly Added');
            } else if(sort === 'Recently Added'){
                setRecentlyAddedSort();
                localStorage.setItem('favoritesSort', 'Recently Added');
            } else if(sort === 'Release Date'){
                setReleaseDateSort();
                localStorage.setItem('favoritesSort', 'Release Date');
            }
        }
    }, [sort, content, setAlphabeticalSort, setFormerlyAddedSort, setRecentlyAddedSort, setReleaseDateSort]);

    return (
        <div className='dropdown d-flex justify-content-center mt-5'>
            <button className='btn btn-dark dropdown-toggle inter-font' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false' style={{transition: 'all 270ms', boxShadow: 'none'}}>
                {sortIcon} Sort by: {sort}
            </button>
                <ul className='dropdown-menu dropdown-menu-dark sort-menu' aria-labelledby='dropdownMenuButton1'>
                    <li className='dropdown-item inter-font pointer' onClick={() => {
                        setSort('Alphabetical');
                    }}>Alphabetical</li>
                    <li className='dropdown-item inter-font pointer' onClick={() => {
                        setSort('Formerly Added');
                    }}>Formerly Added</li>
                    <li className='dropdown-item inter-font pointer' onClick={() => {
                        setSort('Recently Added');
                    }}>Recently Added</li>
                    <li className='dropdown-item inter-font pointer' onClick={() => {
                        setSort('Release Date');
                    }}>Release Date</li>
                </ul>
        </div>
    )
}

export default FavoritesSort;
