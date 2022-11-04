import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import GameCard from './GameCard';
import SearchForm from './SearchForm';
import Spinner from './ui/Spinner';

const SearchScreen = ({history}) => {

    const [content, setContent] = useState([]);

    const cors = 'https://cors-anywhere.herokuapp.com/';
    const url = 'https://www.freetogame.com/api/games';

    const {data, loading, error} = useFetch(`${cors}${url}`);

    const urlParams = new URLSearchParams(history.location.search);
    const q = urlParams.get('q') || '';

    useEffect(() => {

        if(loading || error) return;

        if(q !== ''){
            const filteredGames = data.filter(el => el.title.toLowerCase().includes(q.trim().toLowerCase()));
            setContent(filteredGames);
        }

        if(q === ''){
            setContent([]);
        }
    }, [q, data, error, loading]);

    if(error){

        setTimeout(() => {
            history.replace('/home');
        }, 1500)

        return (
            <div className='d-flex align-items-center flex-column justify-content-center' style={{
                height: 'calc(100vh - 62px)'
            }}>
                <div className='w-100 alert alert-danger text-center inter-font' style={{fontSize: '1.80rem'}}>
                    An error has occurred, returning home...
                </div>
            </div>
        )
    }

    return (
        <div className='mt-5'>

            <div className='search-links d-flex justify-content-evenly align-items-center mb-5'>
                
                <div className='search-active pointer'>
                    <span className='montserrat-font'>Games</span>
                </div>

                
                <Link to='/search/users' className='montserrat-font'>
                    Users
                </Link>
                
            </div>

            {
                (loading)
                ?
                <Spinner />
                :
                <>
                    <h1 className='mb-4 text-center montserrat-font'>Find Games</h1>
                    <SearchForm history={history} />
                    <h2 className='mt-4 text-center montserrat-font'>Results</h2>
                    <hr />
                
                    {
                        (q === '')
                        &&
                        <div className='alert alert-info text-center mx-auto fadeIn' style={{fontSize: '22.5px'}}>
                            Search for games to see some results
                        </div>  
                    }

                    {
                        (q !== '' && !content.length)
                        &&
                        <div className='alert alert-danger text-center mx-auto fadeIn' style={{fontSize: '21px'}}>
                            There are no games with "{q.trim().substring(0, 16)}{(q.trim().length > 17) && "..." }"
                        </div>
                    }

                    {
                        (content.length >= 1)
                        &&
                        <div className='d-flex justify-content-center mt-5 flex-wrap gap-5 container mb-4'>
                            {
                                content.map(game => (
                                    <GameCard
                                    key={game.id} 
                                    title={game.title} 
                                    image={game.thumbnail} 
                                    desc={game.short_description} 
                                    id={game.id} 
                                    genre={game.genre} 
                                    />
                                ))
                            }
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default SearchScreen;
