import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import useFetch from '../hooks/useFetch';
import GameCard from './GameCard';
import Spinner from './ui/Spinner';
import { context } from '../createContext';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { clearFilters } from '../assets/svgs';
import AdvancedFiltersDiv from './AdvancedFiltersDiv';
import BackTop from './BackTop';

const AdvancedGameFiltersScreen = () => {

    const { dispatchUi } = useContext(context);

    const initialFilters = JSON.parse(localStorage.getItem('advancedFilters')) || {
        sort: 'relevance',
        platform: 'all',
        graphics: '',
        combat: '',
        setting: [],
        category: [],
    };

    const [content, setContent] = useState([]);
    const [cardsLoading, setCardsLoading] = useState(false);
    const [filters, setFilters] = useState(initialFilters);

    const containerRef = useRef();
    
    const baseUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=relevance';

    const { data, loading, error } = useFetch(baseUrl);

    const handleScroll = () => {
        if(!containerRef.current) {
            return;
        }
        if(containerRef.current.getBoundingClientRect().top < -160){
            document.querySelector('.back-top').style.display = 'block';
        } else{
            document.querySelector('.back-top').style.display = 'none';
        }
    }

    const fetchFilters = useCallback( async (url) => {
        try {
            await dispatchUi({
                type: types.uiStartLoading,
            })
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '133cefb64fmshcf8e86b0572c993p1482cdjsn17131c1b4299',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
            });
            const data = await response.json();
            setContent(data);
            setCardsLoading(false);
            dispatchUi({
                type: types.uiFinishLoading,
            })
        } catch (error) {
            Swal.fire('An error has occurred filtering games', '', 'error');
            dispatchUi({
                type: types.uiFinishLoading,
            })
        }
    }, [dispatchUi])

    useEffect(() => {
        let url;
        const re = /,/gi; // regular expression for arrays;

        localStorage.setItem('advancedFilters', JSON.stringify(filters));
        
        if(filters.graphics !== '' || filters.combat !== '' || filters.setting.length || filters.category.length){
            setCardsLoading(true);
            const settingStr = `${filters.setting.toString().replace(re, '.')}.`;
            const categoryStr = `${filters.category.toString().replace(re, '.')}.`;
            const graphicsAndCombatStr = `${filters.graphics}.${filters.combat}.`;
            url = `https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${graphicsAndCombatStr}${settingStr}${categoryStr}&platform=${filters.platform}&sort-by=${filters.sort}`;
            fetchFilters(url);
        } else if(filters.sort !== 'relevance' || filters.platform !== 'all'){
            setCardsLoading(true);
            url = `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${filters.sort}&platform=${filters.platform}`;
            fetchFilters(url);
        } else{
            if(!loading && !error && data.status !== 0){
                setContent(data);
            }
        }
    }, [filters, fetchFilters, data, loading, error])

    useEffect(() => {

        const initialFilters = {
            sort: 'relevance',
            platform: 'all',
            graphics: '',
            combat: '',
            setting: [],
            category: [],
        }
        
        return () => {
            setContent([]);
            setCardsLoading(false);
            setFilters(initialFilters);
        }
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    });

    if(error || data?.status === 0){
        return (
            <div 
              className='d-flex align-items-center flex-column justify-content-center' 
              style={{height: 'calc(100vh - 62px)'}}
              >
                  <div className='alert alert-danger rounded text-center'>
                     <h3 className='quicksand-font'>An error has ocurred, games could not be loaded, try again later</h3>
                  </div>
            </div>
        )
    }

    if(loading){
        return (
            <Spinner />
        )
    }

    return (
        <div className='mt-5 fadeIn' ref={containerRef}>
            <h1 className='montserrat-font text-center'>Advanced Game Filters</h1>
            <BackTop />

            <div className='mt-4'>
                <button 
                className='btn btn-dark mx-auto d-flex justify-content-center align-items-center gap-1' 
                style={{transition: 'all 270ms'}}
                onClick={() => {
                    setFilters({
                        sort: 'relevance',
                        platform: 'all',
                        graphics: '',
                        combat: '',
                        setting: [],
                        category: [],
                    });
                }}
                disabled={cardsLoading}
                >
                    {clearFilters} 
                    <span className='inter-font'>Clear Filters</span>
                </button>
            </div>

            <div className='column mt-4'>
                
                <AdvancedFiltersDiv filters={filters} setFilters={setFilters} />

                <div className='col d-flex justify-content-center flex-wrap gap-5 container mt-5' style={{marginBottom: '160px'}}>

                    {
                       (!cardsLoading && content.length >= 1)
                       &&
                       content.map(game => (
                           <GameCard key={game.id} title={game.title} image={game.thumbnail} id={game.id} genre={game.genre} desc={game.short_description} />
                       )) 
                    }

                    {
                        (!cardsLoading && !content.length)
                        &&
                        <div className='alert alert-danger text-center mx-auto fadeIn' style={{fontSize: '22px'}}>
                            No results found with those filters
                        </div>
                    }

                    {
                        (cardsLoading)
                        &&
                        <div className='spinner-grow text-primary' role='status' style={{width: '90px', height: '90px'}}>
                            <span className='visually-hidden'>Loading...</span>
                        </div>
                    }

                </div>
            </div>

        </div>
    )
}

export default AdvancedGameFiltersScreen;
