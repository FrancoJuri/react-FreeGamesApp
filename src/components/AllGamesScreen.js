import React, { useEffect, useRef, useState } from 'react';
import LoadGamesCard from './LoadGamesCard';
import RadiosContainer from './RadiosContainer';
import BackTop from './BackTop';

const AllGamesScreen = () => {

    const initialSort = localStorage.getItem('allGamesSort') || 'relevance';

    const [sort, setSort] = useState(initialSort);
    const containerRef = useRef();

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
    
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            document.removeEventListener('scroll', handleScroll);
        }
    });
     
    return (
        <div className='mt-4 fadeIn' ref={containerRef}>
            
            <h1 className='text-center mb-4 montserrat-font'>All Games</h1> 
            <BackTop />
            <RadiosContainer sort={sort} setSort={setSort} />
            <LoadGamesCard url={`https://www.freetogame.com/api/games?sort-by=${sort}`} />
        </div>
    )
}

export default AllGamesScreen;
