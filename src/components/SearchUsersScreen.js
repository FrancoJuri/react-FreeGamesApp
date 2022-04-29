import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import { usersRef } from '../firebase/firebase-config';
import { returnDocuments } from '../helpers/returnDocuments';
import Spinner from './ui/Spinner';
import UserCard from './UserCard';

const SearchUsersScreen = ({history}) => {

    const [content, setContent] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const urlParams = new URLSearchParams(history.location.search);
    const q = urlParams.get('q') || '';

    const usersInfo = useRef(null);

    const getDbData = useCallback( async () => {
        try {
            usersInfo.current = await usersRef.get().then(returnDocuments);
            if(!usersInfo.current.length){
                setError(true);
                setLoading(false);
                return;
            }
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
            console.log(error);
        }
    }, [])

    useEffect(() => {

        getDbData();

        return () => {
            setContent([]);
            setError(false);
            setLoading(true);
        }

    }, [getDbData])

    useEffect(() => {

        if(loading || error) return;

        if(q !== ''){
            const filteredUsers = usersInfo.current.filter(el => el.name.toLowerCase().includes(q.trim().toLowerCase()));
            setContent(filteredUsers);
        }

        if(q === ''){
            setContent([]);
        }

    }, [q, error, loading])

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
                <Link to='/search/games' className='montserrat-font'>
                    Games
                </Link>

                
                <div className='search-active pointer'>
                    <span className='montserrat-font'>Users</span>
                </div>
                
            </div>

            {
                (loading)
                ?
                <Spinner />
                :
                <>
                    <h1 className='mb-4 text-center montserrat-font'>Find Users</h1>
                    <SearchForm history={history} users={true} />
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
                            There are no users with "{q.trim().substring(0, 16)}{(q.trim().length > 17) && "..." }"
                        </div>
                    }

                    {
                        (content.length >= 1)
                        &&
                        <div className='d-flex justify-content-center mt-5 flex-wrap gap-5 container mb-4'>
                            {
                                content.map(user => (
                                    <UserCard 
                                        key={user.uid}
                                        uid={user.uid}
                                        photoURL={user.photoURL}
                                        name={user.name}
                                        following={user.following}
                                        bio={user.bio}
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

export default SearchUsersScreen;