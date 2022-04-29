import React, {useEffect, useRef} from 'react';
import { useParams } from 'react-router';
import BackTop from './BackTop';
import CategoriesModal from './CategoriesModal';
import LoadGamesCard from './LoadGamesCard';

const CategoryScreen = () => {

    const {category} = useParams();
    const capitalizeCategory = category[0].toUpperCase() + category.substring(1, 30) + ' Games';
    const containerRef = useRef();

    const handleScroll = () => {
        if(!containerRef.current) {
            return;
        }
        if(containerRef.current.getBoundingClientRect().top < -180){
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
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='mt-5 fadeIn' ref={containerRef}>
            <h1 className='text-center mb-5 montserrat-font'>{capitalizeCategory}</h1>
            <BackTop />
            <LoadGamesCard url={`https://www.freetogame.com/api/games?category=${category}`} category={true} />
            <CategoriesModal />
        </div>
    ) 
}

export default CategoryScreen;
