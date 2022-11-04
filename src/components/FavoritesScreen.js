import React, { useCallback, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { usersRef, firebase } from '../firebase/firebase-config';
import { returnDocuments } from '../helpers/returnDocuments';
import ClearFavoritesButton from './ClearFavoritesButton';
import FavoritesCardsDiv from './FavoritesCardsDiv';
import FavoritesSort from './FavoritesSort';
import ScreenErrorDiv from './ScreenErrorDiv';
import Spinner from './ui/Spinner';

const FavoritesScreen = ({history}) => {

    const currentUser = firebase.auth().currentUser;
    const initialSort = localStorage.getItem('favoritesSort') || 'Alphabetical';
    const [screenLoading, setScreenLoading] = useState(true);
    const [screenError, setScreenError] = useState(false);
    const [cardsLoading, setCardsLoading] = useState(false);
    const [content, setContent] = useState([]);
    const [sort, setSort] = useState(initialSort);
    const userInfo = useRef(null);
    const userDocRef = useRef(null);

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    })

    const tryAgainFn = () => {
        getDbData();
        setScreenError(false);
    }

    const handleRemove = (title, id) => {
        Swal.fire({
            title: `Are you sure to delete ${title} from favorites?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete', 
        }).then( (result) => {
            if(result.isConfirmed){
                setCardsLoading(true);
                const filteredContent = content.filter(el => el.id !== id);
                usersRef.doc(userDocRef.current).update({
                    favorites: filteredContent,
                }).then(() => {
                    Toast.fire({
                        icon: 'success',
                        title: `${title} has been removed from favorites successfully`,
                    })
                    setContent(filteredContent);
                }).catch(() => {
                    Toast.fire({
                        icon: 'error',
                        title: `An error has occurred removing ${title}`,
                    })
                }).finally(() => {
                    setCardsLoading(false);
                })
            }
        })
    }

    const getDbData = useCallback( async () => {
        try {
            setScreenLoading(true);
            userInfo.current = await usersRef.where('uid', '==', currentUser.uid).get().then(returnDocuments);
            userDocRef.current = await userInfo.current[0].docId;
            setContent(userInfo.current[0].favorites);
            setScreenLoading(false);
        } catch (error) {
            setScreenError(true);
            setScreenLoading(false);
        }
    }, [currentUser.uid])

    useEffect(() => {

        getDbData();

        return () => {
            userInfo.current = null;
            userDocRef.current = null;
            setContent(null);
            setScreenError(null);
            setScreenLoading(null);
        }

    }, [getDbData]);   

    if(screenLoading){
        return (
            <Spinner />
        )
    }

    if(screenError){
        return (
            <ScreenErrorDiv fn={tryAgainFn}/>
        )
    }

    if(!screenLoading) {
        if(!screenLoading){
            history.listen((location) => {
                if(location.pathname !== '/favorites'){
                    if(document.querySelector('.swal2-container')){
                        document.querySelector('.swal2-container').remove();
                        document.querySelector('body').classList.remove('swal2-shown', 'swal2-height-auto');
                        document.querySelector('html').classList.remove('swal2-shown', 'swal2-height-auto');
                        document.querySelector('body').style.paddingRight = '0px';
                    }
                }
            })
        }
    }

    return (
        <div className='mt-5 fadeIn'>
            <h1 className='montserrat-font text-center mb-4'>Your Favorites Games</h1>
            <h4 className='text-center montserrat-font'>Only you can see what you added as a favorite</h4>

            {
                (content.length >= 1)
                &&
                <FavoritesSort 
                    content={content} 
                    setCardsLoading={setCardsLoading} 
                    sort={sort} 
                    setSort={setSort} 
                />
            }

            <FavoritesCardsDiv 
                content={content} 
                cardsLoading={cardsLoading} 
                handleRemove={handleRemove} 
            />

            {
                (content.length >= 2)
                &&
                <ClearFavoritesButton 
                    setContent={setContent} 
                    setCardsLoading={setCardsLoading}
                    userDocRef={userDocRef.current} 
                />
            }
        </div>
    )
}

export default FavoritesScreen;
