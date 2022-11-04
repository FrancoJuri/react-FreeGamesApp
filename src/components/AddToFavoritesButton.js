import React, { useCallback, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { usersRef, firebase } from '../firebase/firebase-config';
import { returnDocuments } from '../helpers/returnDocuments';

const AddToFavoritesButton = ({content, userDocRef, normalButton, added, setAdded, favoriteLoading, setFavoriteLoading, favoriteError, setFavoriteError}) => {

    const userInfo = useRef();
    const isMounted = useRef(true);
    const currentUser = firebase.auth().currentUser;
    
    let component;
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

    const handleAdd = () => {
        setFavoriteLoading(true);
        const time = new Date().getTime();
        usersRef.doc(userDocRef).update({
            favorites: firebase.firestore.FieldValue.arrayUnion({
                genre: content.genre,
                id: content.id,
                shortDescription: content.short_description,
                thumbnail: content.thumbnail,
                title: content.title,
                release_date: content.release_date,
                platform: content.platform,
                time,
            })
        }).then(() => {
              Toast.fire({
                icon: 'success',
                title: `Game added to favorites successfully`,
              });
            if(isMounted.current){
                setAdded(true);
            }
        }).catch(() => {
            Toast.fire({
                icon: 'error',
                title: 'An error has occurred',
            })
        }).finally(() => {
            if(isMounted.current){
                setFavoriteLoading(false);
            }
        })
    }

    const handleRemove = () => {
        setFavoriteLoading(true);
        const filteredFavoritesArr = userInfo.current[0].favorites.filter(el => el.id !== content.id);
        usersRef.doc(userDocRef).update({
            favorites: filteredFavoritesArr,
        }).then(() => {
            Toast.fire({
                icon: 'success',
                title: `Game removed from favorites successfully`,
            });
            if(isMounted.current){
                setAdded(false);
            }
        }).catch(() => {
            Toast.fire({
                icon: 'error',
                title: 'An error has occurred',
            });
        }).finally(() => {
            if(isMounted.current){
                setFavoriteLoading(false);
            }
        })
    }

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    const getDbData = useCallback( async () => {
        try {
            userInfo.current = await usersRef.where('uid', '==', currentUser.uid).get().then(returnDocuments);
            const arr = userInfo.current[0].favorites;
            const existGame = arr.some(el => el.id === content.id);
            if(existGame){
                if(isMounted.current){
                    setAdded(true);
                    setFavoriteLoading(false);
                }
            } else{
                if(isMounted.current){
                    setFavoriteLoading(false);
                }
            }
        } catch (error) {
            Swal.fire(`${content.title} cannot be added to or removed from favorites because an error has occurred`, '', 'error');
            if(isMounted.current){
                setFavoriteError(true);
                setFavoriteLoading(false);
            }
        }
    }, [currentUser.uid, content.id, setAdded, setFavoriteLoading, setFavoriteError, content.title])

    useEffect(() => {

        getDbData();

        return () => {
            userInfo.current = null;
            setAdded(false);
            setFavoriteLoading(true);
            setFavoriteError(false);
        }
    }, [getDbData, setAdded, setFavoriteLoading, setFavoriteError]);

    if(favoriteError && normalButton){
        component = 
        <button className='btn btn-secondary quicksand-font' onClick={() => {
            getDbData();
            setFavoriteLoading(true);
            setFavoriteError(false);
        }}>
            Try again
        </button>
    } else if(favoriteError && !normalButton){
        component = 
        <button className='fadeIn add-favorites quicksand-font' onClick={() => {
            getDbData();
            setFavoriteLoading(true);
            setFavoriteError(false);
        }}>
            Try again
        </button>
    } else if(favoriteLoading && normalButton){
        component = 
        <button className='btn btn-secondary' type='button' disabled>
            <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'></span>
            <span className='visually-hidden'>Loading...</span>
        </button>
    } else if(favoriteLoading && !normalButton){
        component = 
        <button className='fadeIn add-favorites quicksand-font' type='button' disabled>
            <span className='spinner-grow spinner-grow-sm' role='status' aria-hidden='true'></span>
            <span className='visually-hidden'>Loading...</span>
        </button>
    } else if(!favoriteLoading && normalButton){
        component = 
        <button className='btn btn-secondary quicksand-font' style={{transition: 'all 270ms'}} onClick={() => {
            if(added){
                handleRemove();
            } else{
                handleAdd();
            }
        }}>
            { (added) ? "Remove from Favorites" : "Add to Favorites" }
        </button>
    } else if(!favoriteLoading && !normalButton){
        component = 
        <button className={`${(added) && 'remove-favorites'} fadeIn add-favorites quicksand-font`} onClick={() => {
            if(added){
                handleRemove();
            } else{
                handleAdd();
            }
        }}>
            { (added) ? "Remove from Favorites" : "Add to Favorites" }
        </button>
    }

    return (component)
}

export default AddToFavoritesButton;
