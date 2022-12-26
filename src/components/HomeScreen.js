import React from 'react';
import useFetch from '../hooks/useFetch';
import CategoriesModal from './CategoriesModal';
import HomeCardsSection from './HomeCardsSection';
import HomeCategoryCardsSection from './HomeCategoryCardsSection';
import Footer from './ui/Footer';
import Spinner from './ui/Spinner';

const HomeScreen = () => {

    const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
    const categoryUrl = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=mmorpg';

    const {data, loading, error} = useFetch(url);

    const {data: categoryData, loading: categoryLoading, error: categoryError} = useFetch(categoryUrl);

    if(loading || categoryLoading){
        return (
            <Spinner />
        )
    }

    if(error || categoryError || data?.status === 0 || categoryData?.status === 0){
        return (
            <div className='alert alert-danger rounded text-center'>
                <h3 className='quicksand-font'>An error has ocurred, games could not be loaded, try again later</h3>
            </div>
        )
    }

    return (
        <div className='mt-5 mb-4'>
            
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <h1 className='text-center montserrat-font'>Find Free-To-Play Games</h1>
                <small className='text-muted text-center' style={{fontSize: '20px'}}>    
                    (All the games shown on this website can be played for free)
                </small>
            </div>

            <HomeCardsSection data={data} />

            <hr className='mt-5' />

            <HomeCategoryCardsSection categoryData={categoryData} />

            <CategoriesModal />

            <hr className='mt-4' />
            <Footer />
        </div>
    )
}

export default HomeScreen;
